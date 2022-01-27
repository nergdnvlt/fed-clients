const fetch = require('node-fetch');

exports.helloPubSub = (event, context) => {
  async function fetchMarketingInfo(randomClient, randomVersion) {
    const response = await fetch('https://marketing-waaq4qt37q-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apollographql-client-name': randomClient,
        'apollographql-client-version': randomVersion
      },
      body:JSON.stringify({ query: `query getMarketingInfo {
        users {
          firstName
          lastName
          username
          orders {
            products {
              name
            }
          }
        }
      }`
      })
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.data)
      return result.data
    });
      return response
  };

  let clients = [
      'Scraper-marketing',
      'API-marketing',
  ]
  let randomClient = clients[Math.floor(Math.random() * clients.length)];

  let versions = [
    '1.0',
    '2.0',
  ]
  let randomVersion = versions[Math.floor(Math.random() * versions.length)];

  let possibleTimes = [...Array(30).keys()].map(x => x + 1 )
  let times = possibleTimes[Math.floor(Math.random() * possibleTimes.length)];

  for (let i = 0; i < times; i++) {
      fetchMarketingInfo(randomClient, randomVersion);
  }
};
