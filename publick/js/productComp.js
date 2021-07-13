const product = {
    props: ['product'],
    template: `
        <div class="product_card">
            <img class="product_card-img" :src="product.imgUrl" :alt="product.title" width="360" height="420">
            <div class="product_card-text">
                <a class="box_title" href="#">{{ product.title }}</a>
                <p class="box_text">{{ product.text }}</p>
            </div>
            <p class="box_price">{{ product.price }}$</p>
            <div class="black">
                <p class="black_link" @click="$root.$refs.cart.addProduct(product)">
                    Add to Cart
                </p>
            </div>
        </div>
    `
};

const products = {
    components: {product},
    data() {
        return {
            catalogUrl: '',
            products: [],
            filtered: []
        }
    },
    mounted() {
        // this.getJson(`${API + this.catalogUrl}`)
        //     .then(data => {
 
        //         for (const el of data) {
        //             this.products.push(el);
        //             this.filtered.push(el);
        //         }
        //     });
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let i = 0; i <= 5; i++) {
                    this.products.push(data[i]);
                    this.filtered.push(data[i]);
                }
            }); 
    },
    methods: {
        filter(value) {
            const regExp = new RegExp(value, 'ig');
            
            this.filtered = this.products.filter(prod => {
                return regExp.test(prod.title);
            });
        }
    },
    template: `
        <div class="product container">
            <div class="product_list">
                <product v-for="item of filtered"
                :key="item.id"
                :product="item">
                </product>
            </div>
        </div>
    ` 
}