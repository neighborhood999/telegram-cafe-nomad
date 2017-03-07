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
