import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorExtendedService } from './auth-http-interceptor-extended.service';

describe('AuthHttpInterceptorExtendedService', () => {
  let service: AuthHttpInterceptorExtendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpInterceptorExtendedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
