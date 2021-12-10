const fetch = require('node-fetch');

async function fetchAllProducts() {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({ query: `query getAllProducts {
            products {
              name
              upc
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
    });
};

async function fetchOneProduct(randomProduct) {
    const response = await fetch('https://apollo-gateway-waaq4qt37q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    });
};

let oddsArray = [1, 1, 1, 2, 2 ]
let random = oddsArray[Math.floor(Math.random() * oddsArray.length)];
let randomProduct = Math.floor(Math.random() * 15 + 1);

if(random === 1) {
    fetchAllProducts();
} else {
    fetchOneProduct(randomProduct);
};