const app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'A pair of warm, and fuzzy socks',
        // image: 'assets/vmSocks-green-onWhite.jpg',
        selectedVariant: 0,
        // inStock: false,
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
        cart: 0,
        onSale: true
    },
    methods: {
        addToCart() {
        this.cart++;
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
        }
    }

});

