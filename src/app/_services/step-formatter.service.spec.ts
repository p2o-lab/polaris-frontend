import { inject, TestBed } from '@angular/core/testing';

import { StepFormatterService } from './step-formatter.service';

describe('StepFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepFormatterService]
    });
  });

  it('should be created', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
