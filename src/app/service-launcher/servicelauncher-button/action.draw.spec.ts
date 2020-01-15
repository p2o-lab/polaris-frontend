import {TestBed} from '@angular/core/testing';
import * as Snap from 'snapsvg-cjs';
import {instance, mock} from 'ts-mockito';
import {Action} from './action.draw';

describe('Action', () => {
  let unit: Action;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Action]
    });
  });

  beforeEach(() => {
    const serviceRadius: number = 60;
    const xMid: number = 32;
    const yMid: number = 32;
    const paper = mock(Snap.paper);

    unit = new Action(paper, serviceRadius, xMid, yMid, 'IDLE', 'IDLE');
    spyOn(unit, 'setActions').and.stub();
  });

  xit('should be created', () => {

    expect(unit).toBeTruthy();
  });
});
