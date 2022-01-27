const fetch = require('node-fetch');

exports.helloPubSub = (event, context) => {
    async function fetchAllOrders() {
        const response = await fetch('https://prod-fed-gateway-waaq4qt37q-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apollographql-client-name': 'Web-operations',
                'apollographql-client-version': '1.0'
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

    async function fetchOneOrder(randomOrder) {
        const response = await fetch('https://prod-fed-gateway-waaq4qt37q-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apollographql-client-name': 'Web-operations',
                'apollographql-client-version': '1.0'
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

    async function fetchProductList() {
        const response = await fetch('https://prod-fed-gateway-waaq4qt37q-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apollographql-client-name': 'Web-operations',
                'apollographql-client-version': '1.0'
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

    let oddsArray = [1, 1, 1, 2, 2, 3 ]
    let random = oddsArray[Math.floor(Math.random() * oddsArray.length)];
    let randomOrder = Math.floor(Math.random() * 15 + 1);

    if(random === 1) {
        for (let i = 0; i < 5; i++) {
            fetchAllOrders();
        }
    } else if (random === 2 ) {
        for (let i = 0; i < 5; i++) {
            fetchOneOrder(randomOrder);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            fetchProductList();
        }
    };
};
