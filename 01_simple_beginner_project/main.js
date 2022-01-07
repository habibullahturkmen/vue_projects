Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
});

Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: false
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="socks">
            </div>
    
            <div class="product-info">
    
                <h1>{{ title }}</h1>
    
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <p v-if="onSale">{{ sale }}</p>
                <p v-else>{{ sale }}</p>
    
                <p>Shipping: {{ shipping }}</p>
        
                <product-details :details="details"></product-details>

                <div v-for="(variant, index) in variants" v-bind:key="variant.variantId"
                     class="color-box" v-bind:style="{ backgroundColor: variant.variantColor }"
                     v-on:mouseover="updateProduct(index)">
                </div>
    
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>

            </div>
        </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            description: "A pair of warm, and fuzzy socks",
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-Neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            onSale: true
        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} are on Sale!`;
            } else {
                return `${this.brand} ${this.product} are not on Sale!`;
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return 2.99;
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
    }
});

