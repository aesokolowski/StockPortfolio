//  file to store helper functions
//  i.e. functions that don't alter the store, these would be called from a
//  JSX context:

export const centsToDollarString = cents => {
  let charArr = ('$' + cents.toString()).split('');

  charArr.splice(-2, 0, '.');
  return charArr.join('');
};
