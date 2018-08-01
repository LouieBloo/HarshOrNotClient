import { TestBed, inject } from '@angular/core/testing';

import { AllSearchService } from './all-search.service';

describe('AllSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllSearchService]
    });
  });

  it('should be created', inject([AllSearchService], (service: AllSearchService) => {
    expect(service).toBeTruthy();
  }));
});
