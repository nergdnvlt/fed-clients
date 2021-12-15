const fetch = require('node-fetch');

async function fetchAllOrders(randomClient, randomVersion) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': randomClient,
            'apollographql-client-version': randomVersion
        },
        body:JSON.stringify({ 
            query: `
                query getAllOrders {
                    orders {
                        products {
                            name
                            upc
                        }
                        user {
                            firstName
                            lastName
                            userScore
                            address
                        }
                    }
                }
            `
        })
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result.data)
        return result.data
    });
    return response
};

async function fetchOneOrder(randomClient, randomVersion, randomOrder) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': randomClient,
            'apollographql-client-Service': randomVersion
        },
        body:JSON.stringify({ 
            query: `query getOneOrder($orderId: ID!) {
                order(id: $orderId) {
                    products {
                        name
                        upc
                    }
                    user {
                        firstName
                        lastName
                        userScore
                        address
                    }
                }
            }`,
            variables: {
                orderId: randomOrder
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

async function fetchProductList(randomClient, randomVersion) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': randomClient,
            'apollographql-client-version': randomVersion
        },
        body:JSON.stringify({ 
            query: `
            query getProductList {
                products {
                    name
                    upc
                    brand
                    price {
                        usdPrice
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
    'iOS-operations',
    'Web-operations',
    'Android-operations',
    'POS-operations'
]
let randomClient = clients[Math.floor(Math.random() * clients.length)];

let versions = [
    '1.0',
    '1.1',
    '1.2',
    '1.3',
    '1.4',
    '1.5'
]
let randomVersion = versions[Math.floor(Math.random() * versions.length)];

let oddsArray = [1, 1, 1, 2, 2, 3 ]
let random = oddsArray[Math.floor(Math.random() * oddsArray.length)];
let randomOrder = Math.floor(Math.random() * 15 + 1);

if(random === 1) {
    for (let i = 0; i < 5; i++) {
        fetchAllOrders(randomClient, randomVersion);
    }
} else if (random === 2 ) {
    for (let i = 0; i < 5; i++) {
        fetchOneOrder(randomClient, randomVersion, randomOrder);
    }
} else {
    for (let i = 0; i < 5; i++) {
        fetchProductList(randomClient, randomVersion);
    }
};