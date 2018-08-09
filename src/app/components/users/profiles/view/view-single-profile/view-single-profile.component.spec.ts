import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleProfileComponent } from './view-single-profile.component';

describe('ViewSingleProfileComponent', () => {
  let component: ViewSingleProfileComponent;
  let fixture: ComponentFixture<ViewSingleProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
