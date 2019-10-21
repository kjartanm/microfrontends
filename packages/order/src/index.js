import OrderPizza from './OrderPizza.vue'
import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex/dist/vuex.esm.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        cart: [],
        customerid: null
    },
    mutations: {
        CUSTOMERID(state, customerid) {
            state.customerid = customerid
        },
        CART(state, cart) {
            state.cart = cart
        },
    },
    getters: {
        customerid: state => state.customerid,
        cart: state => state.cart,
    },
    actions: {
        updateCart: ({ commit }, { cart }) => {
            commit('CART', cart)
        },
        initState: ({ commit }) => {
            import('./kernel')
                .then((module) => {
                    module.onKernelKey('change:customerid', customerid => {
                        commit('CUSTOMERID', customerid);
                    });
                    const customerid = module.getSharedKernel('customerid');
                    if (customerid != null) {
                        commit('CUSTOMERID', customerid);
                    }
                    module.onKernelKey('change:cart', cart => {
                        commit('CART', cart);
                    });
                    const cart = module.getSharedKernel('cart');
                    if(cart != null){
                        commit('CART', cart);
                    }
                });

        },
    }
})



export const VueApp = (el) => {
    const App = new Vue({
        template: '<OrderPizza/>',
        components: { OrderPizza },
        store
    })
    App.$mount(el);
}
