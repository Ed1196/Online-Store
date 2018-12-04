import { TestBed } from '@angular/core/testing';

import { CheckoutErrorsService } from './checkout-errors.service';

describe('CheckoutErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutErrorsService = TestBed.get(CheckoutErrorsService);
    expect(service).toBeTruthy();
  });
});
