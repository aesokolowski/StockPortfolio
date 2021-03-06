//  file to store helper functions
//  i.e. functions that don't alter the store, these would be called from a
//  JSX context:

//  convert cents to dollar for displaying on client side
export const centsToDollarString = cents => {
  let charArr = ('$' + cents.toString()).split('');

  charArr.splice(-2, 0, '.');
  return charArr.join('');
};

//  covert 'YYYY-MM-DDTHH.MM.SS.UUUZ' to
//  '<Month> <Day><st/nd/rd/th>, <Year> at HH:MM<AM/PM>'
export const toHumanDate = oldFormat => {
  let monthName;
  let monthNum = oldFormat.substring(5, 7);
  let datePostfix, lastChar, eleTweThi;
  let dateNum = oldFormat.substring(8, 10);
  let yearNum = oldFormat.substring(0, 4);
  let hourInt;
  let hourNum = oldFormat.substring(11, 13);
  let hn = Number(hourNum);
  let isPM;
  let minuteNum = oldFormat.substring(14, 16);
  let dateObj;

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

  //  get offset from Greenwhich Mean Time and
  dateObj = new Date(yearNum, Number(monthNum) - 1, Number(dateNum), hn);
  hn += Number(String(dateObj).substring(28, 31));

  //  convert from 24 hour to 12 hour
  isPM = hn >= 12;
  hourInt = hn % 12;
  hourNum = hourInt === 0 ? '12' : String(hourInt);

  //  store last digit and remove any unnecessary leading zeroes
  lastChar = dateNum.slice(-1);
  if (dateNum[0] === '0') dateNum = dateNum[1];

  //  determine postfix for date
  eleTweThi = dateNum === '11' || dateNum === '12' || dateNum === '13';
  if (lastChar === '1' && !eleTweThi) datePostfix = 'st';
  else if (lastChar === '2' && !eleTweThi) datePostfix = 'nd';
  else if (lastChar === '3' && !eleTweThi) datePostfix = 'rd';
  else datePostfix = 'th';

  //  build return string
  return monthName + ' ' + dateNum + datePostfix + ', ' + yearNum + ' at ' +
      hourNum + ':' + minuteNum + (isPM ? 'PM' : 'AM');
};

/*
export const emailValidator = emailAdd => {

};
*/
