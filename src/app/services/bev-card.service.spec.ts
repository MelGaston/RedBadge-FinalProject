import { TestBed } from '@angular/core/testing';

import { BevCardService } from './bev-card.service';

describe('BevCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BevCardService = TestBed.get(BevCardService);
    expect(service).toBeTruthy();
  });
});
