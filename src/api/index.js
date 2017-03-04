export const apiList = {
  keelung: 'https://cafenomad.tw/api/v1.0/cafes/keelung',
  taipei: 'https://cafenomad.tw/api/v1.0/cafes/taipei',
  taoyuan: 'https://cafenomad.tw/api/v1.0/cafes/taoyuan',
  hsinchu: 'https://cafenomad.tw/api/v1.0/cafes/hsinchu',
  miaoli: 'https://cafenomad.tw/api/v1.0/cafes/miaoli',
  taichung: 'https://cafenomad.tw/api/v1.0/cafes/taichung',
  nantou: 'https://cafenomad.tw/api/v1.0/cafes/nantou',
  changhua: 'https://cafenomad.tw/api/v1.0/cafes/changhua',
  yunli: 'https://cafenomad.tw/api/v1.0/cafes/yunli',
  chiayi: 'https://cafenomad.tw/api/v1.0/cafes/chiayi',
  tainan: 'https://cafenomad.tw/api/v1.0/cafes/tainan',
  kaohsuing: 'https://cafenomad.tw/api/v1.0/cafes/kaohsuing',
  pingtung: 'https://cafenomad.tw/api/v1.0/cafes/pingtung',
  hualien: 'https://cafenomad.tw/api/v1.0/cafes/hualien',
  taitung: 'https://cafenomad.tw/api/v1.0/cafes/taitung',
  penghu: 'https://cafenomad.tw/api/v1.0/cafes/penghu'
};

export const selectLocation = location => {
  location = location.toLowerCase();
  if (!apiList[location]) return [];

  return fetch(apiList[location]).then(response => response.json());
};
