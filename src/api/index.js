import fetch from 'isomorphic-fetch';

export const apiList = {
  taipei: 'https://cafenomad.tw/api/v1.0/cafes/taipei',
  taoyuan: 'https://cafenomad.tw/api/v1.0/cafes/taoyuan',
  hsinchu: 'https://cafenomad.tw/api/v1.0/cafes/hsinchu',
  taichung: 'https://cafenomad.tw/api/v1.0/cafes/taichung',
  changhua: 'https://cafenomad.tw/api/v1.0/cafes/changhua',
  tainan: 'https://cafenomad.tw/api/v1.0/cafes/tainan',
  kaohsuing: 'https://cafenomad.tw/api/v1.0/cafes/kaohsuing',
  pingtung: 'https://cafenomad.tw/api/v1.0/cafes/pingtung'
};

const selectLocation = location => {
  location = location.toLowerCase();
  if (!apiList[location]) return [];

  return fetch(apiList[location]).then(response => response.json());
};

export const cafeInfo = async location => {
  try {
    const result = await selectLocation(location);
    return result;
  } catch (err) {
    console.log(err);
  }
};