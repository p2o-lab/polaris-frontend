import {inject, TestBed} from '@angular/core/testing';

import {StepFormatterService} from './step-formatter.service';
import {ConditionType} from '@p2olab/polaris-interface';

describe('StepFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepFormatterService]
    });
  });

  it('should be created', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service).toBeTruthy();
  }));

  it('should transform parameter 1', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service.parameterToString([{name: 't1', value: 10}, {name: 't2', value: 20}]))
        .toEqual('t1=10, t2=20');
  }));

  it('should transform parameter 2', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service.parameterToString([{name: 't3', value: 10, unit: 'l'}, {name: 't2', value: 20}]))
        .toEqual('t3=10, t2=20');
  }));

  it('should transform conditions 1', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service.conditionToString({
      type: ConditionType.and,
      conditions: [
        {type: ConditionType.state, module: 'PEA1', service: 'Service1', state: 'idle'},
        {type: ConditionType.time, duration: 10}
      ]
    }))
        .toEqual('(PEA1.Service1 == idle) && (duration == 10)');
  }));

  it('should transform conditions 2', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service.conditionToString({
      type: ConditionType.or,
      conditions: [
        {type: ConditionType.variable, module: 'PEA1', variable: 'V', dataAssembly: 'L001', value: 10, operator: '<='},
        {type: ConditionType.expression, expression: 'PEA1.L002.V<3*12'}
      ]
    }))
        .toEqual('(PEA1.L001.V <= 10) || (PEA1.L002.V<3*12)');
  }));

  it('should transform conditions 3', inject([StepFormatterService], (service: StepFormatterService) => {
    expect(service.conditionToString(

        {type: ConditionType.expression, expression: 'PEA1.L002.V<3*12'}))
        .toEqual('PEA1.L002.V<3*12');
  }));

});
