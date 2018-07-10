import { TestBed, inject } from '@angular/core/testing';

import { FetchProfileService } from './fetch-profile.service';

describe('FetchProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchProfileService]
    });
  });

  it('should be created', inject([FetchProfileService], (service: FetchProfileService) => {
    expect(service).toBeTruthy();
  }));
});
