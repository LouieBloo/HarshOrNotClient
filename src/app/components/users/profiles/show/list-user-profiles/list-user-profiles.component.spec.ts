import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserProfilesComponent } from './list-user-profiles.component';

describe('ListUserProfilesComponent', () => {
  let component: ListUserProfilesComponent;
  let fixture: ComponentFixture<ListUserProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
