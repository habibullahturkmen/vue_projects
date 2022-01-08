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
    
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add item to Cart</button>
                <button v-on:click="removeFromCart">Remove from Cart</button>

            </div>
            
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>Name: {{ review.name }}</p>
                    <p>Rating: {{ review.review }}</p>
                    <p>Review: {{ review.rating }}</p>
                    <p>Recommend: {{ review.recommend }}</p>
                    </li>
                </ul>
            </div>
            
            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            description: "A pair of warm, and fuzzy socks",
            selectedVariant: 0,
            onSale: true,
            reviews: [],
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
                    variantQuantity: 1
                }
            ],
        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component("product-details", {
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

Vue.component("product-review", {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
        
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
        
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
        
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
        
            <div>
                <p>Would you recommend this product?</p>
                <label>Yes<input type="radio" v-model="recommend" value="Yes"></label>
                <label>No<input type="radio" v-model="recommend" value="No"></label>
            </div>
            
            <p>
                <input type="submit" value="Submit">
            </p>

        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit("review-submitted", productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                if (!this.name) this.errors.push("Name required");
                if (!this.review) this.errors.push("Review required");
                if (!this.rating) this.errors.push("Rating required");
                if (!this.recommend) this.errors.push("Recommend required");
            }
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
        removeFromCart(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
});

