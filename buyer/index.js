const fetch = require('node-fetch');

async function fetchAllProducts(randomClient, randomVersion) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'apollographql-client-name': randomClient,
        'apollographql-client-version': randomVersion
        },
        body:JSON.stringify({ query: `query getAllProducts {
        products {
            name
            brand
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

async function fetchOneProduct(randomClient, randomVersion, randomProduct) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'apollographql-client-name': randomClient,
        'apollographql-client-version': randomVersion
        },
        body:JSON.stringify({ 
        query: `query getAllProducts($productId: ID!) {
            product(id: $productId) {
            name
            brand
            description
            color
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

async function fetchUserAccount(randomClient, randomVersion, randomUser) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'apollographql-client-name': randomClient,
        'apollographql-client-version': randomVersion
        },
        body:JSON.stringify({ 
        query: `query getAccountInfo($userId: ID!) {
            user(id: $userId) {
            firstName
            lastName
            address
            email
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

async function legacyClientAccount(randomUser) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'apollographql-client-name': 'iOS-buyer',
        'apollographql-client-version': '0.8'
        },
        body:JSON.stringify({ 
        query: `query getAccountInfo($userId: ID!) {
            user(id: $userId) {
            firstName
            lastName
            address
            username
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
    'iOS-buyer',
    'Web-buyer',
    'Android-buyer'
]
let randomClient = clients[Math.floor(Math.random() * clients.length)];

let versions = [
    '1.0',
    '1.1',
    '1.2',
    '1.4',
    '1.5',
    '1.7',
    '1.8',
    '1.9',
    '2.0',
    '2.2',
    '2.5',
    '3.0'
]
let randomVersion = versions[Math.floor(Math.random() * versions.length)];

let oddsArray = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4 ]
let random = oddsArray[Math.floor(Math.random() * oddsArray.length)];

let randomProduct = Math.floor(Math.random() * 15 + 1);

let randomUser = Math.floor(Math.random() * 8 + 1);

// let possibleTimes = [...Array(300).keys()].map(x => x + 30 )
let possibleTimes = [...Array(10).keys()].map(x => x + 2 )
let times = possibleTimes[Math.floor(Math.random() * possibleTimes.length)];

if(random === 1) {
    for (let i = 0; i < times; i++) {
        fetchAllProducts(randomClient, randomVersion);
    }
} else if (random === 2) {
    for (let i = 0; i < times; i++) {
        fetchOneProduct(randomClient, randomVersion, randomProduct);
    }
} else if (random === 3) {
    for (let i = 0; i < times; i++) {
        fetchUserAccount(randomClient, randomVersion, randomUser);
    } 
} else {
    for (let i = 0; i < 4; i++) {
        legacyClientAccount(randomUser);
    }
};