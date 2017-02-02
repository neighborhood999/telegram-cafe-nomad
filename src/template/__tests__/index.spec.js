import test from 'ava';
import { apiList } from '../../api';
import fakeStores from './fakeStores.json';
import {
  startTemplate,
  helpTemplate,
  listTemplate,
  cafeInfoTemplate,
  whereTemplate
} from '../';

test('should get start text', t => {
  const expectedText1 = `
  哈囉！我是 Cafe Nomad Bot，正在找工作咖啡廳嗎？☕️
輸入 \`/help\` 讓 Bot 協助你（妳）尋找吧！😉
`;
  const expectedText2 = `\`/list\` ➡️ 列出城市清單
\`/where\` ➡️ 隨機抽出五筆咖啡廳
\`/location\` ➡️ 選出離你最近的五家咖啡廳`;

  t.is(startTemplate, expectedText1);
  t.is(helpTemplate, expectedText2);
});

test('should get city list text', t => {
  const cityList = Object.keys(apiList).map(city => city.toUpperCase());
  const list = listTemplate(cityList);
  const expectedText = `📝 目前含有資料的城市：

📍 *TAIPEI*
📍 *TAOYUAN*
📍 *HSINCHU*
📍 *TAICHUNG*
📍 *CHANGHUA*
📍 *TAINAN*
📍 *KAOHSUING*
📍 *PINGTUNG*
`;

  t.is(list, expectedText);
});

test('should get cafe information text', t => {
  const store = fakeStores[0];
  const cafeInfo = cafeInfoTemplate(store);
  const expectedText = `🚩 *The Kaffa Lovers*
📍 [台北市中正區金山北路3號](http://maps.google.com/maps?daddr=25.04435400,121.53045590)
💸 ✖️ *3.5*
☕️ ⭐️⭐️⭐️⭐️⭐️

🔍 更多咖啡廳訊息 - [點我👆🏻](https://www.facebook.com/thekaffalovers/?fref=ts)

`;

  t.is(cafeInfo, expectedText);
});

test('should get calcuate distance', t => {
  let shallowCopyStore = Object.assign({}, fakeStores[0], {
    disNum: 5,
    unit: 'km'
  });
  const cafeInfo = cafeInfoTemplate(shallowCopyStore);
  const expectedText = `🚩 *The Kaffa Lovers*
📍 [台北市中正區金山北路3號](http://maps.google.com/maps?daddr=25.04435400,121.53045590)
💸 ✖️ *3.5*
☕️ ⭐️⭐️⭐️⭐️⭐️
🔜 距離約 *5 km*
🔍 更多咖啡廳訊息 - [點我👆🏻](https://www.facebook.com/thekaffalovers/?fref=ts)

`;
  t.is(cafeInfo, expectedText);
});

test('should get take3StoresText and last2Stores', t => {
  const { take3StoresText, lastStores } = whereTemplate(fakeStores);
  const expectedTake3StoresText = `🚩 *The Kaffa Lovers*
📍 [台北市中正區金山北路3號](http://maps.google.com/maps?daddr=25.04435400,121.53045590)
💸 ✖️ *3.5*
☕️ ⭐️⭐️⭐️⭐️⭐️

🔍 更多咖啡廳訊息 - [點我👆🏻](https://www.facebook.com/thekaffalovers/?fref=ts)

🚩 *啡創工廠 Future Factory*
📍 [台北市大同區民族西路31巷18號](http://maps.google.com/maps?daddr=25.06916700,121.51959800)
💸 ✖️ *4*
☕️ ⭐️⭐️⭐️⭐️⭐️

🔍 更多咖啡廳訊息 - [點我👆🏻](https://www.facebook.com/future.factory.coffee)

🚩 *三宜咖啡館 Triple E Cafe*
📍 [台北市北投區大業路719-1號1樓（捷運新北投站）](http://maps.google.com/maps?daddr=25.13748390,121.50208500)
💸 ✖️ *4*
☕️ ⭐️⭐️⭐️⭐️

🔍 更多咖啡廳訊息 - [點我👆🏻](https://m.facebook.com/tripleEcafe/?locale2=zh_TW)

`;

  t.is(take3StoresText, expectedTake3StoresText);
  t.deepEqual(lastStores, fakeStores.slice(3, 5));
});
