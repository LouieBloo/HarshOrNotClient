import { TestBed, inject } from '@angular/core/testing';

import { AgeRangeService } from './age-range.service';

describe('AgeRangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgeRangeService]
    });
  });

  it('should be created', inject([AgeRangeService], (service: AgeRangeService) => {
    expect(service).toBeTruthy();
  }));
});
