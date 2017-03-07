import test from 'ava';
import fetchMock from 'fetch-mock';
import { apiList, selectLocation } from '../';

test('should get cafe stores information by given city', async t => {
  const mockResponse = [
    {
      id: '0022fc3b-598f-4bb5-bb69-1b7d1b9b5202',
      name: 'The Kaffa Lovers',
      city: 'taipei',
      wifi: 4.5,
      seat: 5,
      quiet: 4,
      tasty: 5,
      cheap: 3.5,
      music: 5,
      url: 'https://www.facebook.com/thekaffalovers/?fref=ts',
      address: '台北市中正區金山北路3號',
      latitude: '25.04435400',
      longitude: '121.53045590'
    }
  ];
  fetchMock.mock(apiList['taipei'], mockResponse);

  const cafeInfo = await selectLocation('Taipei');
  t.deepEqual(cafeInfo[0]['name'], mockResponse[0]['name']);
});
