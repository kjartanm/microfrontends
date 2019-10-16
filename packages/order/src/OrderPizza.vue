<template>
    <section class="vue-module">
        <wired-card class="layout-container">
            <div class="order">
                <div class="order-head">
                    <h2>{{ title }}</h2>
                    <p style="padding: 0.5em; background-color: rgba(255,255,255,0.7)">Change of address? Please <a href="/profile">edit your profile</a>!</p>
                </div>
                <table class="order-list" v-if="cart.length">
                    <tr class="order-line" v-for="item in cart">
                        <td class="order-name">{{ item.name }}</td>
                        <td class="order-number"><wired-button>+</wired-button><wired-input class="order-number-input" v-bind:value="item.number"></wired-input><wired-button>-</wired-button></td>
                        <td class="order-price">{{ item.price }},-</td>
                        <td class="order-remove">
                            <wired-icon-button v-on:click="removeFromCart(item.menuid)" class="catalogue-shoppingcart">
                                <img className="cart-ill" src="/static/assets/remove_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                        </td>  
                    </tr>
                </table>
                <div class="order-extra">
                    <wired-card>
                        <h3 class="order-title-extra">Add some extras!</h3>
                        <div class="order-extra-item">Add extra cheese
                            <wired-icon-button v-on:click="addToCartCart(item.menuid)" class="order-shoppingcart">
                                <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                        </div>
                        <div class="order-extra-item">Add extra pineapple
                            <wired-icon-button v-on:click="addToCartCart(item.menuid)" class="order-shoppingcart">
                                <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                        </div>
                        <div class="order-extra-item">Add maple syrup
                            <wired-icon-button v-on:click="addToCartCart(item.menuid)" class="order-shoppingcart">
                                <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                        </div>
                    </wired-card>
                </div>
                <div class="order-submit">

                    <h3>Please check your order and <wired-button>submit!</wired-button>
                    </h3>

                </div>
            </div>
        </wired-card>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Order your pizza(s) here!'
            }
        },
        mounted: function () {
            this.$store.dispatch('initState');
        },
        methods: {
            removeFromCart: function (id) {
                const _cart = this.cart.filter(item => item.menuid != id)
                import('./kernel').then((Module) => {
                    Module.updateSharedKernel({ cart: _cart });
                })
            },
            addToCart: function (id, name, price) {
                const _cart = this.cart.concat({ menuid: id, number: 1, name, price })
                import('./kernel').then((Module) => {
                    console.log("add")
                    Module.updateSharedKernel({ cart: _cart });
                })
            }
        },
        computed: {
            cart() {
                return this.$store.getters.cart || [];
            }
        }
    }
</script>