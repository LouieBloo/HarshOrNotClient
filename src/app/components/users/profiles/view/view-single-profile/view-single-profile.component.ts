import { Component, OnInit, Input, SimpleChanges, HostListener, ViewChild, ElementRef, Output } from '@angular/core';
import { FetchProfileService } from '../../../../../services/user/profiles/fetch/fetch-profile.service';
import { User } from '../../../../../models/user';
import { FetchProfileFeedbackService } from '../../../../../services/feedback/fetch-profile-feedback/fetch-profile-feedback.service';
import { ProfileFeedback } from '../../../../../models/feedback';
import { GALLERY_CONF, GALLERY_IMAGE } from 'ngx-image-gallery';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-single-profile',
  templateUrl: './view-single-profile.component.html',
  styleUrls: ['./view-single-profile.component.css']
})
export class ViewSingleProfileComponent implements OnInit {


  //user info
  @Input() userID: string;
  user: User;

  //When the user submits their feedback, emit it happened so parent components can react. IE the date page component
  @Output() sentFeedbackEmitter = new EventEmitter();

  //feedback stuff
  feedback: ProfileFeedback = { target: "", feedback: "" };
  formValid: boolean = false;
  canEditForm: boolean = false;
  @ViewChild('closeModalButton') closeModalButton: ElementRef;
  modalStatus: string = "initial";

  //when we submit our feedback and we are dating, this will hold the timer of when to tell the dating page to move on
  finishViewingCountdown: any;

  // gallery configuration
  galleryConf: GALLERY_CONF = {
    showDeleteControl: false,
    showImageTitle: false,
    showCloseControl: false,
    inline: true,
    thumbnailSize: 40,
    backdropColor: "rgba(255, 178, 0, 0)",
    reactToMouseWheel: false
  };
  galleryImages: GALLERY_IMAGE[];
  galleryHeight: number = 500;

  //we need a reference to the gallery container to fix a bug in the npm package
  @ViewChild('galleryContainer') galleryContainer: ElementRef;

  constructor(
    private fetchProfileService: FetchProfileService,
    private fetchFeedbackService: FetchProfileFeedbackService
  ) {

  }


  ngOnInit() {
    //this.setGalleryHeight();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchUserInfo();

  }

  ngAfterViewInit(): void {
    this.hackGalleryScrollEvent();
  }

  //resize gallery when screen size changes
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.setGalleryHeight();
  }

  //calls the services that fetch user info and feedback
  fetchUserInfo() {
    if (this.userID) {
      this.fetchProfileService.fetchUser(this.userID).subscribe(result => {

        if (result && !result.error) {

          if (result.photos && result.photos.length > 0) {
            let bigPhotoURLs = this.applyPhotoFilter(result.photos);
            let thumbnailPhotoURLs = this.applyThumbnailPhotoFilter(result.photos);

            let tempImageArray = [];
            for (let i = 0; i < bigPhotoURLs.length && i < thumbnailPhotoURLs.length; i++) {
              tempImageArray.push({ url: bigPhotoURLs[i], thumbnailUrl: thumbnailPhotoURLs[i] });
            }
            this.galleryImages = tempImageArray;
          }

          this.user = result;
          this.user.preference = this.user.preference.replace("Female", "women").replace("Male", "men").replace("Both", "women and men");
        }
      });

      this.fetchFeedbackService.fetchSingleProfileFeedback({ target: this.userID }).subscribe(result => {
        if (result && !result.error) {

          this.feedback = result
          this.feedback.wouldYouDate = this.changeWouldYouDateText(this.feedback.wouldYouDate);
          this.canEditForm = false;
        } else {
          this.canEditForm = true;
        }
      })
    }
  }

  applyPhotoFilter(photoArr: string[]): string[] {
    if (!photoArr || photoArr.length < 1) {
      return null;
    } else {
      let result = [];
      photoArr.forEach((url) => {
        result.push(url.replace("filter", "adaptive-fit-in/750x750"));
      })
      return result;
    }
  }

  applyThumbnailPhotoFilter(photoArr: string[]): string[] {
    if (!photoArr || photoArr.length < 1) {
      return null;
    } else {
      let result = [];
      photoArr.forEach((url) => {
        result.push(url.replace("filter", "adaptive-fit-in/100x100"));
      })
      return result;
    }
  }

  //need to dynamically control the height when the width of the page gets small
  setGalleryHeight() {
    if (window.innerWidth >= 500) {
      this.galleryHeight = 500;
    }
    else {
      this.galleryHeight = 500 - (500 - window.innerWidth);
    }
  }

  //feedback button is pressed
  feedbackSubmitted() {
    this.modalStatus = "loading";
    this.feedback.target = this.userID;
    this.fetchFeedbackService.addProfileFeedback(this.feedback).subscribe(result => {
      console.log(result);
      if (result && !result.error) {
        this.feedback = result;
        if (this.feedback.wouldYouDate == "Yes" && this.feedback.wouldTheyDate == "Yes") {
          this.modalStatus = "match"
        } else {
          this.modalStatus = "done";
        }
        this.feedback.wouldYouDate = this.changeWouldYouDateText(this.feedback.wouldYouDate);
        this.canEditForm = false;



        //this.closeModalButton.nativeElement.click();
      } else {
        this.closeModalButton.nativeElement.click();
      }
    })
  }

  //called when the user is done submitting feedback
  //sets a delay and then fires the sentFeedbackEmitter
  finishViewing() {
    if (this.modalStatus == "match" || this.modalStatus == "done") {
      if (!this.finishViewingCountdown) {
        this.finishViewingCountdown = setTimeout(() => {
          this.sentFeedbackEmitter.emit(this.userID);
        }, 750);
      }
    }
  }

  //when the feedback text area is receiving letters
  //make sure the user has enough in it to submit
  textAreaChanged(event: string) {
    if (event.length > 10) {
      this.formValid = true;
      return;
    }
    this.formValid = false;
  }

  changeWouldYouDateText(text) {
    if (text) {
      return text.replace("NoBut", "Not my type but they look great!");
    }

    return "";
  }

  // TODO: Remove once this bug is fixed (https://github.com/thatisuday/ngx-image-gallery/issues/14)
  private hackGalleryScrollEvent() {
    const el = (<HTMLDivElement>this.galleryContainer.nativeElement);
    el.addEventListener('mousewheel', (event) => {
      event.stopPropagation();
    }, {
        capture: true
      });
  }
}
