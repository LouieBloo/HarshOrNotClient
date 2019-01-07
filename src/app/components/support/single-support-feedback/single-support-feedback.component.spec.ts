import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSupportFeedbackComponent } from './single-support-feedback.component';

describe('SingleSupportFeedbackComponent', () => {
  let component: SingleSupportFeedbackComponent;
  let fixture: ComponentFixture<SingleSupportFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSupportFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSupportFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
