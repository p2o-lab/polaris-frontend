import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {mock} from 'ts-mockito';
import {Icon} from './icon.draw';

describe('Icon', () => {
  let unit: Icon;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Icon]
    });
  });

  beforeEach(() => {
    unit = new Icon();
  });

  it('should be created', () => {
    expect(unit).toBeTruthy();
  });

  /* Play Symbol */
  it('should show the running symbol', () => {
    const result = Icon.getIcon('RUNNING');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the start symbol', () => {
    const result = Icon.getIcon('START');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the resume symbol', () => {
    const result = Icon.getIcon('RESUME');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the unhold symbol', () => {
    const result = Icon.getIcon('UNHOLD');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the resuming symbol', () => {
    const result = Icon.getIcon('RESUMING');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the unholding symbol', () => {
    const result = Icon.getIcon('UNHOLDING');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the starting symbol', () => {
    const result = Icon.getIcon('STARTING');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });
  it('should show the execute symbol', () => {
    const result = Icon.getIcon('EXECUTE');
    expect(result).toBe('M8,5.14V19.14L19,12.14L8,5.14Z');
  });

  /* Cross Symbol */
  it('should show the abort symbol', () => {
    const result = Icon.getIcon('ABORT');
    expect(result).toBe('M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,' +
      '17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z');
  });
  it('should show the aborting symbol', () => {
    const result = Icon.getIcon('ABORTING');
    expect(result).toBe('M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,' +
      '17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z');
  });
  it('should show the aborted symbol', () => {
    const result = Icon.getIcon('ABORTED');
    expect(result).toBe('M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,' +
      '17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z');
  });

  /* Pause Symbol */
  it('should show the pause symbol', () => {
    const result = Icon.getIcon('PAUSE');
    expect(result).toBe('M14,19H18V5H14M6,19H10V5H6V19Z');
  });
  it('should show the pausing symbol', () => {
    const result = Icon.getIcon('PAUSING');
    expect(result).toBe('M14,19H18V5H14M6,19H10V5H6V19Z');
  });
  it('should show the paused symbol', () => {
    const result = Icon.getIcon('PAUSED');
    expect(result).toBe('M14,19H18V5H14M6,19H10V5H6V19Z');
  });

  /* Hold Symbol */
  it('should show the hold symbol', () => {
    const result = Icon.getIcon('HOLD');
    expect(result).toBe('M19,13H5V11H19V13Z');
  });
  it('should show the holding symbol', () => {
    const result = Icon.getIcon('HOLDING');
    expect(result).toBe('M19,13H5V11H19V13Z');
  });
  it('should show the held symbol', () => {
    const result = Icon.getIcon('HELD');
    expect(result).toBe('M19,13H5V11H19V13Z');
  });

  /* Stop Symbol */
  it('should show the stop symbol', () => {
    const result = Icon.getIcon('STOP');
    expect(result).toBe('M18,18H6V6H18V18Z');
  });
  it('should show the stopping symbol', () => {
    const result = Icon.getIcon('STOPPING');
    expect(result).toBe('M18,18H6V6H18V18Z');
  });
  it('should show the stopped symbol', () => {
    const result = Icon.getIcon('STOPPED');
    expect(result).toBe('M18,18H6V6H18V18Z');
  });

  /* Reset Symbol */
  it('should show the reset symbol', () => {
    const result = Icon.getIcon('RESET');
    expect(result).toBe('M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,' +
      '8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
  });
  it('should show the aborting symbol', () => {
    const result = Icon.getIcon('RESETTING');
    expect(result).toBe('M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,' +
      '8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
  });
  it('should show the idle symbol', () => {
    const result = Icon.getIcon('IDLE');
    expect(result).toBe('M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,' +
      '8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
  });

  /* Restart Symbol */
  it('should show the restart symbol', () => {
    const result = Icon.getIcon('RESTART');
    expect(result).toBe('M 12 5 V 1 L 7 6 l 5 5 V 7 c 3.31 0 6 2.69 6 6 s ' +
      '-2.69 6 -6 6 s -6 -2.69 -6 -6 H 4 c 0 4.42 3.58 8 8 8 s 8 -3.58 8 -8 s -3.58 -8 -8 -8 Z');
  });

  /* Complete Symbol */
  it('should show the complete symbol', () => {
    const result = Icon.getIcon('COMPLETE');
    expect(result).toBe('M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z');
  });
  it('should show the completing symbol', () => {
    const result = Icon.getIcon('COMPLETING');
    expect(result).toBe('M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z');
  });
  it('should show the completed symbol', () => {
    const result = Icon.getIcon('COMPLETED');
    expect(result).toBe('M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z');
  });

  /* Misc Symbols */
  it('should show the pin on symbol', () => {
    const result = Icon.getIcon('pinOn');
    expect(result).toBe('M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z');
  });
  it('should show the pinned off symbol', () => {
    const result = Icon.getIcon('pinOff');
    expect(result).toBe('M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.' +
      '8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z');
  });
  it('should show the settings symbol', () => {
    const result = Icon.getIcon('settings');
    expect(result).toBe('M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1' +
      ' 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.' +
      '5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 ' +
      '19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,' +
      '8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,' +
      '5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,' +
      '2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,' +
      '5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,' +
      '9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,' +
      '14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,' +
      '18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,' +
      '22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,' +
      '17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,' +
      '14.78 21.54,14.63L19.43,12.97Z');
  });
  it('should show the unknown symbol', () => {
    const result = Icon.getIcon('unknown');
    expect(result).toBe('M 21.83 7.56 C 20.39 6.52 18.44 6 15.98 6 C ' +
      '14.62 6 13.27 6.15 11.94 6.45 C 10.61 6.76 9.63 7.04' +
      ' 9 7.31 C 9 7.31 9 12 9 12 C 9 12 9.59 12 9.59 12 C 10.32' +
      ' 11.41 11.13 10.93 12.02 10.56 C 12.9 10.19 13.69 10 14.39 10' +
      ' C 15.54 10 16.42 10.2 17.05 10.61 C 17.68 11.02 18 11.7 18 12.66 ' +
      'C 18 13.29 17.85 13.87 17.55 14.38 C 17.25 14.88 16.84 15.32 16.31 15.7 ' +
      'C 15.76 16.13 15.23 16.45 14.72 16.64 C 14.21 16.83 13.63 17.01 13 17.19 C 13 ' +
      '17.19 13 22 13 22 C 13 22 18 22 18 22 C 18 22 18 18.73 18 18.73 C 18.91 18.38 19.74 ' +
      '17.99 20.47 17.56 C 21.21 17.14 21.84 16.65 22.36 16.11 C 22.88 15.57 23.28 14.93 23.56 ' +
      '14.19 C 23.85 13.45 24 12.59 24 11.62 C 24 9.95 23.27 8.59 21.83 7.56 z M 19 24 C 19 24 ' +
      '13 24 13 24 C 13 24 13 28 13 28 C 13 28 19 28 19 28 C 19 28 19 24 19 24 z');
  });

});
