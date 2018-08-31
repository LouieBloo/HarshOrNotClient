import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { EightteenOrOlderDirective } from './directives/age/eightteen-or-older.directive';
import { UpdatePhotosComponent } from './components/users/photos/update-photos/update-photos.component';
import { UpdatePhotoSingleComponent } from './components/users/photos/update-photos/update-photo-single/update-photo-single.component';
import { SinglePhotoComponent } from './components/users/photos/show-photos/single-photo/single-photo.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ListUserProfilesComponent } from './components/users/profiles/show/list-user-profiles/list-user-profiles.component';
import { ListUserProfileSingleComponent } from './components/users/profiles/show/list-user-profiles/list-user-profile-single/list-user-profile-single.component';
import { ViewSingleProfileComponent } from './components/users/profiles/view/view-single-profile/view-single-profile.component';
import { DateComponent } from './components/pages/date/date.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { ListFeedbackComponent } from './components/feedback/profile/list-feedback/list-feedback.component';
import { LoadingComponent } from './components/animations/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MyProfileComponent,
    RegisterComponent,
    LoginComponent,
    EightteenOrOlderDirective,
    UpdatePhotosComponent,
    UpdatePhotoSingleComponent,
    SinglePhotoComponent,
    SearchComponent,
    ListUserProfilesComponent,
    ListUserProfileSingleComponent,
    ViewSingleProfileComponent,
    DateComponent,
    FeedbackComponent,
    ListFeedbackComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NouisliderModule,
    ImageCropperModule,
    NgxImageGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
