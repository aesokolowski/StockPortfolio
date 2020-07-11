//  Trying to run tests for my toHumanDate function I came across two issues:

//  when trying to use npm test I kept getting a Redux error that I do not get
//  when using npm run start-dev or npm start, has something to do with
//  the combineReducers middleware as far as I can tell, so I gave up on mocha

//  my next issue is that I can't just run a normal test program since
//  I use the export statement, so I just copied and pasted the code into this
//  file, easier than memorizing long experimental flags or whatever was in the
//  the Node documentation

const toHumanDate = oldFormat => {
  let monthName;
  let monthNum = oldFormat.substring(5, 7);
  let datePostfix, lastChar, eleTweThi;
  let dateNum = oldFormat.substring(8, 10);

  //  determine month abbreviation
  switch (monthNum) {
    case '01':
      monthName = 'Jan.'; break;
    case '02':
      monthName = 'Feb.'; break;
    case '03':
      monthName = 'Mar.'; break;
    case '04':
      monthName = 'Apr.'; break;
    case '05':
      monthName = 'May'; break;
    case '06':
      monthName = 'Jun.'; break;
    case '07':
      monthName = 'Jul.'; break;
    case '08':
      monthName = 'Aug.'; break;
    case '09':
      monthName = 'Sep.'; break;
    case '10':
      monthName = 'Oct.'; break;
    case '11':
      monthName = 'Nov.'; break;
    case '12':
      monthName = 'Dec.'; break;
    default:
      monthName = '???';
  }

  //  remove leading zero
  lastChar = dateNum.slice(-1);
  if (dateNum[0] === '0') dateNum = dateNum[1];

  //  determine postfix for date
  eleTweThi = dateNum === '11' || dateNum === '12' || dateNum === '13';
  if (lastChar === '1' && !eleTweThi) datePostfix = 'st';
  else if (lastChar === '2' && !eleTweThi) datePostfix = 'nd';
  else if (lastChar === '3' && !eleTweThi) datePostfix = 'rd';
  else datePostfix = 'th';

  //  build return string
  return monthName + ' ' + dateNum + datePostfix;
};

//  being test logic

const monthStrings = [];
const expectedMonths = [
  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.',
  'Nov.', 'Dec.'
];
let monthsResultsExp = '';
let monthsResultsAct = '';

//  populate monthStrings -- these Strings will all have the same values
//  except for the month
console.log('Input strings:');
for (let i = 1; i <= 12; i++) {
  let str = '0' + String(i);
  let full = '';

  if (str.length === 3) str = str.slice(1);
  full = '2020-' + str + '-01T00:00:00.000Z';
  monthStrings.push(full);
  console.log('    ' + full);
}

//  print expected results
console.log('\nExpected results:');
for (let i = 0; i < 12; i++) {
  monthsResultsExp += '    ' + expectedMonths[i] + ' 1st\n';
}
console.log(monthsResultsExp);

//  print actual results
console.log('Actual results:');
for (let i = 0; i < 12; i++) {
  monthsResultsAct += '    ' + toHumanDate(monthStrings[i]) + '\n';
}
console.log(monthsResultsAct);

console.log('Pass?:');
console.log('    ' + (monthsResultsExp === monthsResultsAct));
