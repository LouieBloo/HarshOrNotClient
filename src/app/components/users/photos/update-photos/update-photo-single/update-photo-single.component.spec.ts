import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoSingleComponent } from './update-photo-single.component';

describe('UpdatePhotoSingleComponent', () => {
  let component: UpdatePhotoSingleComponent;
  let fixture: ComponentFixture<UpdatePhotoSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePhotoSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhotoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
