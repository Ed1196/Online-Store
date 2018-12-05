import { TestBed } from '@angular/core/testing';

import { ErrorPagesService } from './error-pages.service';

describe('ErrorPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorPagesService = TestBed.get(ErrorPagesService);
    expect(service).toBeTruthy();
  });
});
