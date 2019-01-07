import { TestBed, inject } from '@angular/core/testing';

import { SupportFeedbackService } from './support-feedback.service';

describe('SupportFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportFeedbackService]
    });
  });

  it('should be created', inject([SupportFeedbackService], (service: SupportFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
