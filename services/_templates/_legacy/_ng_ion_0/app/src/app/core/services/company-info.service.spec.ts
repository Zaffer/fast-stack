import { TestBed } from '@angular/core/testing';

import { CompanyInfoService } from './company-info.service';

describe('CompanyInfoService', () => {
  let service: CompanyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
