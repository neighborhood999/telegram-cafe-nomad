import TelegramBot from 'node-telegram-bot-api';
import googleMaps from '@google/maps';
import fetch from 'isomorphic-fetch';
import { apiList, selectLocation } from './api';
import { random, transformToEngCityName } from './utils';
import {
  moreInlineButton,
  getLocationButton,
  citysButton
} from './template/replyMarkup';
import {
  startTemplate,
  helpTemplate,
  listTemplate,
  whereTemplate,
  cafeInfoTemplate
} from './template';
import { reverseGeocode, cafeStoresNearby } from './utils/googleMaps';

const token = process.env.BOT_TOKEN;
const googleMapsAPIKey = process.env.GOOGLE_MAP_API_TOKEN;
const env = process.env.NODE_ENV || 'development';

const options = { parse_mode: 'markdown' };
let bot;
let fullInfo = '';

if (env === 'production') {
  const webHook = { port: process.env.PORT || 443 };
  const url = process.env.APP_URL || 'https://<your app url>.com:443';

  bot = new TelegramBot(token, { webHook });
  bot.setWebHook(`${url}/bot${token}`);
} else {
  bot = new TelegramBot(token, { polling: true });
}

const cafeInfo = async cityName => {
  try {
    const response = await selectLocation(cityName);
    return response;
  } catch (err) {
    console.log(err);
  }
};

bot.onText(/\/start/, message => {
  const chatId = message.chat.id;

  return bot.sendMessage(chatId, startTemplate, options);
});

bot.onText(/\/help/, message => {
  const chatId = message.chat.id;

  return bot.sendMessage(chatId, helpTemplate, options);
});

bot.onText(/\/list/, message => {
  const chatId = message.chat.id;
  const cityList = Object.keys(apiList).map(city => city.toUpperCase());

  return bot.sendMessage(chatId, listTemplate(cityList), options);
});

bot.onText(/\/choose/, message => {
  const chatId = message.chat.id;
  const text = '請點擊按鈕選擇城市！';

  return bot.sendMessage(
    chatId,
    text,
    Object.assign({}, options, {
      reply_markup: citysButton
    })
  );
});

bot.onText(/\/where(\s)?(.+)?/, (message, match) => {
  const chatId = message.chat.id;
  const cityName = match[2];

  if (match[2] === undefined) {
    return bot.sendMessage(chatId, '請輸入城市名稱！');
  }

  if (!apiList[cityName.toLowerCase()]) {
    return bot.sendMessage(chatId, '抱歉，還沒有該城市相關咖啡廳資訊！');
  }

  cafeInfo(cityName).then(stores => {
    const randomIndex = random(stores);
    const cafeStores = randomIndex.map(randNum => stores[randNum]);
    let { take3StoresText, lastStores } = whereTemplate(cafeStores);

    fullInfo += take3StoresText;
    fullInfo += lastStores.map(store => cafeInfoTemplate(store));

    bot.sendMessage(
      chatId,
      take3StoresText,
      Object.assign({}, options, {
        reply_markup: moreInlineButton
      })
    );
  });
});

bot.onText(/\location/, (message, match) => {
  const chatId = message.chat.id;
  const text = '按下按鈕取得定位！';

  return bot.sendMessage(
    chatId,
    text,
    Object.assign({}, options, {
      reply_markup: getLocationButton
    })
  );
});

bot.onText(/\issue/, message => {
  const chatId = message.chat.id;
  const text =
    '✉️ *Telegram Bot 問題回報:* https://github.com/neighborhood999/telegram-cafe-nomad/issues';

  return bot.sendMessage(chatId, text, options);
});

bot.on('callback_query', message => {
  switch (message.data) {
    case 'more':
      const { message: { message_id, chat: { id } } } = message;
      bot.editMessageText(
        fullInfo,
        Object.assign({}, options, {
          chat_id: id,
          message_id
        })
      );

      // Cleaning up for next coming text.
      fullInfo = '';
      return;
  }
});

bot.on('location', message => {
  const chatId = message.chat.id;
  const { location: { latitude, longitude } } = message;
  const googleMapsClient = googleMaps.createClient({ key: googleMapsAPIKey });
  const origins = { lat: latitude, lng: longitude };
  const checkCity = reverseGeocode(origins)(googleMapsClient);

  checkCity((err, cityName) => {
    if (err) {
      console.log(err);
      return bot.sendMessage(chatId, 'API 發生錯誤，請重新嘗試！');
    }

    if (!apiList[cityName.toLowerCase()]) {
      return bot.sendMessage(chatId, '抱歉，還沒有該城市相關咖啡廳資訊！');
    }

    cafeInfo(cityName).then(stores => {
      const givePostion = cafeStoresNearby(origins)(googleMapsClient);
      const newStores = stores.map(store => {
        let position = { lat: store['latitude'], lng: store['longitude'] };

        return givePostion(position).then(distance => {
          store = Object.assign({}, store, { distance });

          return store;
        });
      });

      Promise.all(newStores)
        .then(results => {
          const nextStores = results.map(store => {
            let disNum = store['distance'].match(
              /^[0-9]+(.[0-9]+)?|^[0-9]+(.[0-9]+)?/
            );
            let unit = store['distance'].match(/km$|m$/);

            store['disNum'] = disNum[0];
            store['unit'] = unit[0];

            return store;
          });
          const filterStores = nextStores.filter(store => store['disNum'] <= 5);

          return filterStores;
        })
        .then(filterStores => {
          let { take3StoresText, lastStores } = whereTemplate(filterStores);
          fullInfo += take3StoresText;
          fullInfo += lastStores.map(store => cafeInfoTemplate(store));

          bot.sendMessage(
            chatId,
            take3StoresText,
            Object.assign({}, options, {
              reply_markup: moreInlineButton
            })
          );
        })
        .catch(err => console.log(err));
    });
  });
});

bot.on('message', message => {
  const chatId = message.chat.id;
  const cityName = transformToEngCityName(message);

  if (cityName) {
    cafeInfo(cityName).then(stores => {
      const randomIndex = random(stores);
      const cafeStores = randomIndex.map(randNum => stores[randNum]);
      let { take3StoresText, lastStores } = whereTemplate(cafeStores);

      fullInfo += take3StoresText;
      fullInfo += lastStores.map(store => cafeInfoTemplate(store));

      bot.sendMessage(
        chatId,
        take3StoresText,
        Object.assign({}, options, {
          reply_markup: moreInlineButton
        })
      );
    });
  }
});
