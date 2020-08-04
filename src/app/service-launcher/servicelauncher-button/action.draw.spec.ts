import {TestBed} from '@angular/core/testing';
import * as Snap from 'snapsvg-cjs';
import {mock} from 'ts-mockito';
import {Action} from './action.draw';

describe('Action', () => {
  let unit: Action;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Action]
    });
  });

  beforeEach(() => {
    const serviceRadius = 60;
    const xMid = 32;
    const yMid = 32;
    const paper = mock(Snap.paper);

    unit = new Action(paper, serviceRadius, xMid, yMid, 'IDLE', 'IDLE');
    spyOn(unit, 'setActions').and.stub();
  });

  xit('should be created', () => {

    expect(unit).toBeTruthy();
  });
});
