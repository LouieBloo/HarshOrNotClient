import { TestBed, inject } from '@angular/core/testing';

import { FetchProfileFeedbackService } from './fetch-profile-feedback.service';

describe('FetchProfileFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchProfileFeedbackService]
    });
  });

  it('should be created', inject([FetchProfileFeedbackService], (service: FetchProfileFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
