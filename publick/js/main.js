const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

let main = new Vue({
    el: '.app',
    data: {
        catalogUrl: '',
        products: [],
        show: false,
        filtered: [],
    },
    components: {cart, products, filter_el},
    methods: {
        getJson(url) {
            return fetch(url)
                    .then(result => result.json())
                    .catch(err => {
                        console.log(err);
                    });
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(err => console.log(err));
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(err => console.log(err));
        }

    },
})