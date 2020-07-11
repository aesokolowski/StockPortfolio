import { expect } from 'chai';
import { toHumanDate } from '../code';

describe('Helper tests', () => {
  describe('toHumanDate:', () => {
    const dummy = '2020-01-01T00:00:00.000Z';

    it('is a function', () => {
      expect(toHumanDate).to.be.a('function');
    });
    it('returns a string', () => {
      expect(toHumanDate(dummy)).is.a('string');
    });
  });
  describe('toHumanDate can convert segments of given date data:',
      () => {
    const expectedMonths = [
      'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.',
      'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ];
    const expectedDays = [
      '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th',
      '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th',
      '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th',
      '26th', '27th', '28th', '29th', '30th', '31st'
    ];
    let inputDates;
    let expectedOutput;

    beforeEach(() => {
      inputDates = [];
      expectedOutput = [];
    });

    it('properly converts months to human readable:', () => {
      //  setup:
      for (let i = 1; i <= 12; i++) {
        inputDates.push('2020-' + (i < 10 ? '0' : '') + i + '-01T00:00' +
            ':00.000Z');
      }
      for (let i = 0; i < 12; i++) {
        expectedOutput.push(expectedMonths[i] + ' 1st');
      }

      //  tests:
      for (let i = 0; i < 12; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });

    it('properly converts days to human readable:', () => {
      //  setup:
      for (let i = 1; i <= 31; i++) {
        inputDates.push('2020-01-' + (i < 10 ? '0' : '') + i + 'T00:00' +
            ':00.000Z');
      }
      for (let i = 0; i < 31; i++) {
        expectedOutput.push('Jan. ' + expectedDays[i]);
      }

      //  tests:
      for (let i = 0; i < 31; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });
  });
});
