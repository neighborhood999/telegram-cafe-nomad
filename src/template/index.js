import { countStar } from '../utils/index';

export const startTemplate = `
  哈囉！我是 Cafe Nomad Bot，正在找工作咖啡廳嗎？☕️
使用 \`/choose\` 快速選擇城市尋找咖啡廳 or
輸入 \`/help\` 查看 Bot 提供的功能吧！😉
`;

export const helpTemplate = `\`/list\` ➡️ 列出城市清單
\`/where\` ➡️ 隨機抽出五筆咖啡廳
\`/choose\` ➡️ 點擊按鈕選擇城市，隨機五間咖啡廳
\`/location\` ➡️ 選出離你最近的五家咖啡廳`;

export const listTemplate = cityList => {
  let text = `📝 目前含有資料的城市：\n\n`;
  let citys = '';

  cityList.map(city => (citys += `📍 *${city}*\n`));

  return `${text}${citys}`;
};

export const cafeInfoTemplate = store =>
  `🚩 *${store.name}*
📍 [${store.address}](http://maps.google.com/maps?daddr=${store.latitude},${store.longitude})
💸 ✖️ *${store.cheap}*
☕️ ${countStar(store.tasty)}
${store.disNum && store.unit ? `🔜 距離約 *${store['disNum']} ${store['unit']}*` : ''}
🔍 更多咖啡廳訊息 - [點我👆🏻](${store.url})\n
`;

export const whereTemplate = stores => {
  const take3Stores = stores.slice(0, 3);
  const lastStores = stores.slice(3, 5);
  let take3StoresText = '';

  take3Stores.map(store => (take3StoresText += cafeInfoTemplate(store)));

  return { take3StoresText, lastStores };
};
