import { TestBed, inject } from '@angular/core/testing';

import { AutomatedSearchService } from './automated-search.service';

describe('AutomatedSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomatedSearchService]
    });
  });

  it('should be created', inject([AutomatedSearchService], (service: AutomatedSearchService) => {
    expect(service).toBeTruthy();
  }));
});
