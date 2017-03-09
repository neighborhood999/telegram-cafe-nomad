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

export const transformToEngCityName = message => {
  if (typeof message != 'object') return;

  const chineseName = message.text.slice(3, 5);
  let city;

  switch (chineseName) {
    case '基隆':
      city = 'keelung';
      break;
    case '台北':
      city = 'taipei';
      break;
    case '桃園':
      city = 'taoyuan';
      break;
    case '新竹':
      city = 'hsinchu';
      break;
    case '苗栗':
      city = 'miaoli';
      break;
    case '台中':
      city = 'taichung';
      break;
    case '南投':
      city = 'nantou';
      break;
    case '彰化':
      city = 'changhua';
      break;
    case '雲林':
      city = 'yunli';
      break;
    case '嘉義':
      city = 'chiayi';
      break;
    case '台南':
      city = 'tainan';
      break;
    case '高雄':
      city = 'kaohsuing';
      break;
    case '屏東':
      city = 'pingtung';
      break;
    case '花蓮':
      city = 'hualien';
      break;
    case '台東':
      city = 'taitung';
      break;
    case '澎湖':
      city = 'penghu';
      break;
  }

  return city;
};

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
