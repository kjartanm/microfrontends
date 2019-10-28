<template>
    <section class="vue-module">
        <wired-card class="layout-container">
            <div v-if="!customerid" class="order">
                <div class="order-head">
                    <h2>{{ title }}</h2>
                    <h3>But <a href="/">Log in to</a> Pizza Heaven before doing anything here!</h3>
                </div>
            </div>
            <div v-else class="order">
                <div class="order-head">
                    <h2>{{ title }}</h2>
                    <p style="padding: 0.5em; background-color: rgba(255,255,255,0.7)">Change of address? Please <a
                            href="/profile">edit your profile</a>!</p>
                </div>
                <div class="order-list">
                    <table v-if="cart.length">
                        <tr class="order-line" v-for="item in cart">
                            <td class="order-name">{{ item.name }}</td>
                            <td class="order-number">
                                <wired-button v-on:click="removeFromItem(item.menuid)">-</wired-button>
                                <wired-card style="padding: 3px"><input class="order-number-input" type="text"
                                        v-bind:value="item.number"></wired-card>
                                <wired-button v-on:click="addToItem(item.menuid)">+</wired-button>
                            </td>
                            <td class="order-price">{{ item.price }},-</td>
                            <td class="order-remove">
                                <wired-icon-button v-on:click="removeFromCart(item.menuid)"
                                    class="catalogue-shoppingcart">
                                    <img className="cart-ill" src="/static/assets/remove_shopping_cart-24px.svg"></img>
                                </wired-icon-button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="order-submit">
                    <h3>Total: {{total}},- </h3>
                    <h3>Please check your order and <wired-button style="background-color: lightsteelblue;">submit!
                        </wired-button>
                    </h3>
                </div>
                <div class="order-extra">
                    <wired-card>
                        <h3 class="order-title-extra">Add some extras!</h3>
                        <div class="order-extra-item">Add extra cheese
                            <wired-icon-button v-if="isNotInCart(20)" v-on:click="addToCart(20, 'Extra cheese', 3)"
                                class="order-shoppingcart">
                                <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                            <img v-else className="cart-ill" src="/static/assets/check-24px.svg"></img>
                        </div>
                        <div class="order-extra-item">Add extra pineapple
                            <wired-icon-button v-if="isNotInCart(30)" v-on:click="addToCart(30, 'Extra pineapple', 3)"
                                class="order-shoppingcart">
                                <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                            <img v-else className="cart-ill" src="/static/assets/check-24px.svg"></img>
                        </div>
                        <div class="order-extra-item">Add maple syrup
                            <wired-icon-button v-if="isNotInCart(40)" v-on:click="addToCart(40, 'Maplesyrup', 3)"
                                class="order-shoppingcart">
                                <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img>
                            </wired-icon-button>
                            <img v-else className="cart-ill" src="/static/assets/check-24px.svg"></img>
                        </div>
                    </wired-card>
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
                const _cart = this.cart.concat({ menuid: id, number: 1, name, price });
                import('./kernel').then((Module) => {
                    Module.updateSharedKernel({ cart: _cart });
                })
            },
            isNotInCart: function (id) {
                return this.cart.findIndex(item => item.menuid == id) == -1;
            },
            removeFromItem: function (id) {
                let item = this.cart.find(item => item.menuid == id);
                if (item) {
                    item.number--;
                    let _cart = this.cart;
                    if (item.number < 0) {
                        _cart = this.cart.filter(item => item.menuid != id)
                    }
                    import('./kernel').then((Module) => {
                        Module.updateSharedKernel({ cart: _cart });
                    })
                }
            },
            addToItem: function (id) {
                let item = this.cart.find(item => item.menuid == id);
                if (item) {
                    item.number++;
                    import('./kernel').then((Module) => {
                        Module.updateSharedKernel({ cart: this.cart });
                    })
                }
            }
        },
        computed: {
            cart() {
                return this.$store.getters.cart || [];
            },
            customerid() {
                return this.$store.getters.customerid || null;
            },
            total() {
                const reducer = (accumulator, item) => accumulator + (item.number * item.price);
                return this.cart.reduce(reducer, 0);
            }
        }
    }
</script>