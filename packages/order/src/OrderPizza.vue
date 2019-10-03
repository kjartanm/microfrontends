<template>
  <section class="vue-module"><wired-card class="layout-container">
        <h2>{{ title }}</h2>
        <ul v-if="cart.length">
          <li v-for="item in cart">{{ item.name }}</li>
        </ul>
  </wired-card></section>
</template>

<script>
export default {
  data () {
    return {
      title: 'Order your pizza here!'
    }
  },
mounted: function () {
  this.$store.dispatch('initState');
},
  computed: {
      cart () {
        return this.$store.getters.cart || [];
      }
    }
}
</script>
