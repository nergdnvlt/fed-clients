const fetch = require('node-fetch');
const pry = require('pryjs');

async function fetchAllOrders() {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': 'Web',
            'apollographql-client-Service': 'Ops',
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

async function fetchOneOrder(randomOrder) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': 'Web',
            'apollographql-client-Service': 'Ops',
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

let oddsArray = [1, 1, 1, 2, 2 ]
let random = oddsArray[Math.floor(Math.random() * oddsArray.length)];
let randomOrder = Math.floor(Math.random() * 15 + 1);

if(random === 1) {
    fetchAllOrders();
} else {
    fetchOneOrder(randomOrder);
};