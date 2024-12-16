import { TestBed } from '@angular/core/testing';

import { MamService } from './mam.service';

describe('MamService', () => {
  let service: MamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
