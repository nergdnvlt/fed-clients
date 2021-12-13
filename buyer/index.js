const fetch = require('node-fetch');

async function fetchAllProducts(randomClient) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': randomClient,
            'apollographql-client-version': 'Buyer'
        },
        body:JSON.stringify({ query: `query getAllProducts {
            products {
              name
              price {
                usdPrice
                priceDecorator
              }
            }
          }`})
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result.data)
        return result.data
    });
    return response
};

async function fetchOneProduct(randomClient, randomProduct) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': randomClient,
            'apollographql-client-version': 'Buyer'
        },
        body:JSON.stringify({ 
            query: `query getAllProducts($productId: ID!) {
                product(id: $productId) {
                    name
                    upc
                    price {
                        usdPrice
                        priceDecorator
                    }
                }
            }`,
            variables: {
                productId: randomProduct
            }
        })
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result.data)
        return result.data
    });
    return response
};

async function fetchUserAccount(randomClient, randomUser) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': randomClient,
            'apollographql-client-version': 'Buyer'
        },
        body:JSON.stringify({ 
            query: `query getAccountInfo($userId: ID!) {
                user(id: $userId) {
                  firstName
                  lastName
                  orders {
                    products {
                      name
                      price {
                        usdPrice
                      }
                    }
                  }
                }
              }`,
            variables: {
                userId: randomUser
            }
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
    'iOS',
    'Web',
    'Android'
]
let randomClient = clients[Math.floor(Math.random() * clients.length)];

let oddsArray = [1, 1, 1, 2, 2, 3 ]
let random = oddsArray[Math.floor(Math.random() * oddsArray.length)];

let randomProduct = Math.floor(Math.random() * 15 + 1);

let randomUser = Math.floor(Math.random() * 9 + 1);


let possibleTimes = [...Array(300).keys()].map(x => x + 30 )
let times = possibleTimes[Math.floor(Math.random() * possibleTimes.length)];

if(random === 1) {
    for (let i = 0; i < times; i++) {
        fetchAllProducts(randomClient);
    }
} else if (random === 2) {
    for (let i = 0; i < times; i++) {
        fetchOneProduct(randomClient, randomProduct);
    }
} else {
    for (let i = 0; i < times; i++) {
        fetchUserAccount(randomClient, randomUser);
    } 
}