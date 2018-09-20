import { TestBed, inject } from '@angular/core/testing';

import { LastOnlineService } from './last-online.service';

describe('LastOnlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastOnlineService]
    });
  });

  it('should be created', inject([LastOnlineService], (service: LastOnlineService) => {
    expect(service).toBeTruthy();
  }));
});
