export const random = array => {
  const LIMIT = 5;
  let tmp = [];

  for (let i = 0; i < LIMIT; i++) {
    tmp.push(Math.floor(Math.random() * array.length));
  }

  return tmp;
};

export const countStar = num => {
  let star = '';

  if (num === 0) return (star = '沒有評分');

  if (isFloat(num)) {
    for (let i = 0; i < num - 0.5; i++) {
      star += '⭐️';
    }
    star += '✨';
  } else {
    for (let i = 0; i < num; i++) {
      star += '⭐️';
    }
  }

  return star;
};

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
