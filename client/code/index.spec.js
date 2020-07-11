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
  describe('toHumanDate can convert segments of given date data, ' +
      'properly formatted i.e. Jun. 15th, 1952 at 3:45AM', () => {
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

    it('properly converts months to human readable: 01 - 12 becomes ' +
        'Jan. - Dec.', () => {
      //  setup:
      for (let i = 1; i <= 12; i++) {
        inputDates.push('2020-' + (i < 10 ? '0' : '') + i + '-01T00:00' +
            ':00.000Z');
      }
      for (let i = 0; i < 12; i++) {
        expectedOutput.push(expectedMonths[i] + ' 1st, 2020 at 12:00AM');
      }

      //  tests:
      for (let i = 0; i < 12; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });

    it('properly converts days to human readable: 00 - 31 become 1st -' +
        ' 31st with correct postfixes', () => {
      //  setup:
      for (let i = 1; i <= 31; i++) {
        inputDates.push('2020-01-' + (i < 10 ? '0' : '') + i + 'T00:00' +
            ':00.000Z');
      }
      for (let i = 0; i < 31; i++) {
        expectedOutput.push('Jan. ' + expectedDays[i] +
            ', 2020 at 12:00AM');
      }

      //  tests:
      for (let i = 0; i < 31; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });

    it('properly converts years to human readable: 1901 - 2000', () => {
      //  setup:
      for (let i = 1901; i <= 2000; i++) {
        inputDates.push(i + '-01-01T00:00:00.000Z');
        expectedOutput.push('Jan. 1st, ' + i + ' at 12:00AM');
      }
      for (let i = 0; i < 100; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });

    it('properly converts hours to human readable: 00 - 23 becomes 12AM'
        + ', 1AM, 2AM..11AM, 12PM, 1PM..11PM', () => {
      //  setup:
      for (let i = 0; i <= 23; i++) {
        let modded = i % 12;

        inputDates.push('2020-01-01T' + (i < 10 ? '0' : '') + i + ':00' +
            ':00.000Z');
        expectedOutput.push('Jan. 1st, 2020 at ' +
            (modded === 0 ? '12' : modded) + ':00' +
            (i >= 12 ? 'PM' : 'AM'));
      }

      //  test:
      for (let i = 0; i < 24; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });

    it('properly takes the minutes from the input and puts it in the ' +
        'correct place in the output: 00 - 59', () => {
      // setup:
      for (let i = 0; i <= 59; i++) {
        inputDates.push('2020-01-01T00:' + (i < 10 ? '0' : '') + i +
            ':00.000Z');
        expectedOutput.push('Jan. 1st, 2020 at 12:' +
            (i < 10 ? '0' : '') + i + 'AM');
      }

      //  test
      for (let i = 0; i < 60; i++) {
        expect(toHumanDate(inputDates[i])).deep
          .equals(expectedOutput[i]);
      }
    });
  });
});
