const cartBox = {
    props: ['good'],
    template: `
        <div class="cart_box row">
            <img class="cart_box-img" :src="good.imgUrl" :alt="good.title">
            <div class="cart_box-content">
                <p class="cart_box-brand">{{ good.title }}</p>

                <ul class="cart_box-values">
                    <li>Price:<span class="cart_box-item price">{{ good.price }}$</span></li>

                    <li>Quantity: {{ good.quantity }}</li>  
                    
                    <li>Sum:<span class="cart_box-item price">{{ good.price * good.quantity }}$</span></li>
                </ul>
                <button class="cart_box-close" @click="$parent.removeProduct(good)">
                    &#10005;
                </button>
            </div>
        </div>
    `
};

const cart = {
    components: {'cart-item': cartBox},
    data() {
        return {
            cartUrl: '',
            goods: [],
        }
    },
    methods: {
        addProduct(el) {
            let find = this.goods.find(prod => prod.id == el.id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
                    .then(data => {
                        
                        if (data.result === 1) {
                            find.quantity++;
                        }             
                    });
            } else {
                let cartProduct = Object.assign({quantity: 1}, el);
                this.$parent.postJson('/api/cart', cartProduct)
                    .then(data => {
                        if(data.result === 1){
                            this.goods.push(cartProduct);
                        }
                    })
            }
        }, 
        removeProduct(el) {
            this.$parent.getJson(`${API}addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = +el.id;

                        let find = this.goods.find(prod => prod.id == productId);
    
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.goods.splice(this.goods.indexOf(find), 1);
                        }
                    } else {
                        console.error('Error');
                    }
                })
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
        .then(data => {
            for (const el of data.contents) {
                this.goods.push(el);
            }
        }); 
    },
    template: `
        <div class="cart" v-show="$parent.show">
            <cart-item v-for="item of goods" :good="item"></cart-item>
        </div>
    `
}