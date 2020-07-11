//  file to store helper functions
//  i.e. functions that don't alter the store, these would be called from a
//  JSX context:

//
export const centsToDollarString = cents => {
  let charArr = ('$' + cents.toString()).split('');

  charArr.splice(-2, 0, '.');
  return charArr.join('');
};

//  covert 'YYYY-MM-DDTHH.MM.SS.UUUZ' to
//  '<Month> <Day><st/nd/th>, <YEAR> at HH:MM<AM/PM>'
export const toHumanDate = oldFormat => {
  let monthName;
  let monthNum = oldFormat.substring(5, 7);

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

  return monthName;
};

export const emailValidator = emailAdd => {

};
