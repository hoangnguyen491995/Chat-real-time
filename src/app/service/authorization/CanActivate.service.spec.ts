/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanActivateService } from './CanActivate.service';

describe('Service: CanActivate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateService]
    });
  });

  it('should ...', inject([CanActivateService], (service: CanActivateService) => {
    expect(service).toBeTruthy();
  }));
});
