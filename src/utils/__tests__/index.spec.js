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
