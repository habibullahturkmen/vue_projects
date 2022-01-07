const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm, and fuzzy socks',
        image: 'assets/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-Neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg"
            }
        ],
        cart: 0,
    },
    methods: {
        addToCart() {
        this.cart++;
        },
        updateProduct(variantImage) {
            this.image = variantImage;
        }
    }

});

