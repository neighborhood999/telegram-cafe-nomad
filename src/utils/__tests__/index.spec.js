import test from 'ava';
import { random, countStar, transformToEngCityName } from '../';

test('should get random 5 items from getting an array.', t => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const random5Array = random(array);

  t.is(random5Array.length, 5);
});

test('should calcuate star and return emoji text', t => {
  const intNumber = 5;
  const textResult1 = countStar(intNumber);
  const expectedText1 = '⭐️⭐️⭐️⭐️⭐️';
  t.is(textResult1, expectedText1);

  const floatNumber = 3.5;
  const textResult2 = countStar(floatNumber);
  const expectedText2 = '⭐️⭐️⭐️✨';
  t.is(textResult2, expectedText2);

  const zero = 0;
  const textResult3 = countStar(zero);
  const expectedText3 = '沒有評分';
  t.is(textResult3, expectedText3);
});

test('should transform message text city name to english city name.', t => {
  const expectCity = 'taipei';
  const mockMessage = {
    message_id: 440,
    from: {
      id: 195214679,
      first_name: 'Peng',
      last_name: 'Jie',
      username: 'pengjie'
    },
    chat: {
      id: 195214679,
      first_name: 'Peng',
      last_name: 'Jie',
      username: 'pengjie',
      type: 'private'
    },
    date: 1488943714,
    text: '📍 台北'
  };

  const cityName = transformToEngCityName(mockMessage);

  t.is(cityName, expectCity);
});

test('should transform message text city name to english city name (other city test)', t => {
  const templateMessage = {
    message_id: 440,
    from: {
      id: 195214679,
      first_name: 'Peng',
      last_name: 'Jie',
      username: 'pengjie'
    },
    chat: {
      id: 195214679,
      first_name: 'Peng',
      last_name: 'Jie',
      username: 'pengjie',
      type: 'private'
    },
    date: 1488943714
  };

  const mockMessage1 = Object.assign({}, templateMessage, { text: '📍 基隆' });
  const cityName1 = transformToEngCityName(mockMessage1);
  t.is(cityName1, 'keelung');

  const mockMessage2 = Object.assign({}, templateMessage, { text: '📍 桃園' });
  const cityName2 = transformToEngCityName(mockMessage2);
  t.is(cityName2, 'taoyuan');

  const mockMessage3 = Object.assign({}, templateMessage, { text: '📍 新竹' });
  const cityName3 = transformToEngCityName(mockMessage3);
  t.is(cityName3, 'hsinchu');

  const mockMessage4 = Object.assign({}, templateMessage, { text: '📍 苗栗' });
  const cityName4 = transformToEngCityName(mockMessage4);
  t.is(cityName4, 'miaoli');

  const mockMessage5 = Object.assign({}, templateMessage, { text: '📍 台中' });
  const cityName5 = transformToEngCityName(mockMessage5);
  t.is(cityName5, 'taichung');

  const mockMessage6 = Object.assign({}, templateMessage, { text: '📍 南投' });
  const cityName6 = transformToEngCityName(mockMessage6);
  t.is(cityName6, 'nantou');

  const mockMessage7 = Object.assign({}, templateMessage, { text: '📍 彰化' });
  const cityName7 = transformToEngCityName(mockMessage7);
  t.is(cityName7, 'changhua');

  const mockMessage8 = Object.assign({}, templateMessage, { text: '📍 雲林' });
  const cityName8 = transformToEngCityName(mockMessage8);
  t.is(cityName8, 'yunli');

  const mockMessage9 = Object.assign({}, templateMessage, { text: '📍 嘉義' });
  const cityName9 = transformToEngCityName(mockMessage9);
  t.is(cityName9, 'chiayi');

  const mockMessage10 = Object.assign({}, templateMessage, { text: '📍 台南' });
  const cityName10 = transformToEngCityName(mockMessage10);
  t.is(cityName10, 'tainan');

  const mockMessage11 = Object.assign({}, templateMessage, { text: '📍 高雄' });
  const cityName11 = transformToEngCityName(mockMessage11);
  t.is(cityName11, 'kaohsuing');

  const mockMessage12 = Object.assign({}, templateMessage, { text: '📍 屏東' });
  const cityName12 = transformToEngCityName(mockMessage12);
  t.is(cityName12, 'pingtung');

  const mockMessage13 = Object.assign({}, templateMessage, { text: '📍 花蓮' });
  const cityName13 = transformToEngCityName(mockMessage13);
  t.is(cityName13, 'hualien');

  const mockMessage14 = Object.assign({}, templateMessage, { text: '📍 台東' });
  const cityName14 = transformToEngCityName(mockMessage14);
  t.is(cityName14, 'taitung');

  const mockMessage15 = Object.assign({}, templateMessage, { text: '📍 澎湖' });
  const cityName15 = transformToEngCityName(mockMessage15);
  t.is(cityName15, 'penghu');
});
