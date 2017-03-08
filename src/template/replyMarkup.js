export const more = JSON.stringify({
  inline_keyboard: [
    [
      {
        text: 'More...',
        callback_data: 'more'
      }
    ]
  ]
});

export const getLocation = JSON.stringify({
  keyboard: [
    [
      {
        text: '📍 取得定位',
        request_contact: false,
        request_location: true
      }
    ]
  ],
  callback_data: 'location',
  resize_keyboard: true,
  one_time_keyboard: true
});

export const citys = JSON.stringify({
  keyboard: [
    [{ text: '📍 基隆' }, { text: '📍 台北' }, { text: '📍 桃園' }],
    [{ text: '📍 新竹' }, { text: '📍 苗栗' }, { text: '📍 台中' }],
    [{ text: '📍 南投' }, { text: '📍 彰化' }, { text: '📍 雲林' }],
    [{ text: '📍 嘉義' }, { text: '📍 台南' }, { text: '📍 高雄' }],
    [{ text: '📍 屏東' }, { text: '📍 花蓮' }, { text: '📍 台東' }, { text: '📍 澎湖' }]
  ],
  resize_keyboard: true,
  one_time_keyboard: true
});
