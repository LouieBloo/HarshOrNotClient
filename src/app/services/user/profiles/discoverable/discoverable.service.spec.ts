import { TestBed, inject } from '@angular/core/testing';

import { DiscoverableService } from './discoverable.service';

describe('DiscoverableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoverableService]
    });
  });

  it('should be created', inject([DiscoverableService], (service: DiscoverableService) => {
    expect(service).toBeTruthy();
  }));
});
