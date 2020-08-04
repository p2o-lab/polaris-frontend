import {TestBed} from '@angular/core/testing';
import {mock} from 'ts-mockito';
import {ServiceVisualisation} from './service.draw';

describe('ServiceVisualitation', () => {
  let unit: ServiceVisualisation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceVisualisation]
    });
  });

  beforeEach(() => {
    unit = mock(ServiceVisualisation);
  });

  it('should be created', () => {
    expect(unit).toBeTruthy();
  });
});
