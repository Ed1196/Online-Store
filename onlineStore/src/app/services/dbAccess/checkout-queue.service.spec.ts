import { TestBed } from '@angular/core/testing';

import { CheckoutQueueService } from './checkout-queue.service';

describe('CheckoutQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutQueueService = TestBed.get(CheckoutQueueService);
    expect(service).toBeTruthy();
  });
});
