<template>
    <div class="hello">
        <h1>JOB AD PRODUCTS</h1>

        <div v-if="products" v-for="product in products">
            <div class="row">
                <div value="product.id">
                    {{product.name}}
                    <button @click="addProduct(product.id)" >Add to Cart</button>
                </div>

            </div>
        </div>
        <div v-else>
            <p>No products found</p>
        </div>

        <div class="row" style="margin-top: 20px;">
            <button @click="checkout()" :disabled="!isLogin" >Check out</button>
        </div>
    </div>
</template>

<script>
    import productApi from '../api/products/index'

    export default {
        name: 'Checkout',
        data () {
            return {
                products: [],
                selectedProducts : []
            }
        },

        mounted(){
            var token  = this.$route.query.token
            localStorage.setItem('id_token', token)
            this.getProducts()


            console.log(this.isLogin)
            if(! this.isLogin){
                alert("Please Log In to continue!")
            }
        },
        methods: {
            getProducts() {
                var _this = this
                productApi.getProducts(this).then(response => _this.products = response.products)

                console.log(_this.products)
            },

            addProduct(productID){

                var _selecteProducts = this.selectedProducts

                var checkProducts = _selecteProducts.filter(p => p.product_id == productID)

                if( checkProducts.length > 0){
                    _selecteProducts.map(function (product) {
                        if (product.product_id == productID) {
                            var q =  product.quantity
                            product.quantity = q+1;
                            return product
                        }
                    });

                    this.selectedProducts = _selecteProducts;

                }else{
                    this.selectedProducts.push({
                        "product_id" : productID,
                        "quantity": 1
                    })
                }

                alert("Added into cart \n" + JSON.stringify(this.selectedProducts))
            },

            checkout(){

                var checkoutConfirmation = confirm("Are you sure? Selected Products: \n" + JSON.stringify(this.selectedProducts));

                if(checkoutConfirmation == true) {
                    var parameter = {
                        "products": this.selectedProducts
                    }
                    productApi.checkout(this, parameter).then(response => {
                        if (response.message == "success") {
                            alert("Checkout successfull!! \n" + JSON.stringify(response.data));
                        } else {
                            alert("Oops, something went wrong!!");
                        }
                    });
                }

            }

        },
        computed: {
            // a computed getter
            isLogin: function () {
                return (localStorage.getItem('id_token') !== 'undefined')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
