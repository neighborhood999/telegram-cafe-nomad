export const reverseGeocode = origins => {
  return client => {
    return callback => {
      client.reverseGeocode(
        { latlng: origins, result_type: 'street_address' },
        (err, response) => {
          if (err) return callback(err);

          const { results } = response.json;
          const longName = results[0]['address_components'][4]['long_name'];

          callback(null, longName.match(/[a-zA-Z0-9]+/)[0]);
        }
      );
    };
  };
};

export const cafeStoresNearby = origins => {
  return client => {
    return destinations => {
      return new Promise((resolve, reject) => {
        client.distanceMatrix({ origins, destinations }, (err, response) => {
          if (err) return reject(err);

          const { rows } = response.json;
          const { distance: { text } } = rows[0]['elements'][0];
          resolve(text);
        });
      });
    };
  };
};
