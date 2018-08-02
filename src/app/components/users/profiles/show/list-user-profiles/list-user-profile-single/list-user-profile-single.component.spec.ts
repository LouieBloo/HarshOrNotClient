import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserProfileSingleComponent } from './list-user-profile-single.component';

describe('ListUserProfileSingleComponent', () => {
  let component: ListUserProfileSingleComponent;
  let fixture: ComponentFixture<ListUserProfileSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserProfileSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserProfileSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
