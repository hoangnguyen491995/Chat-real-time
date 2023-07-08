/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PopoverService } from './popover.service';

describe('Service: Popover', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopoverService]
    });
  });

  it('should ...', inject([PopoverService], (service: PopoverService) => {
    expect(service).toBeTruthy();
  }));
});
