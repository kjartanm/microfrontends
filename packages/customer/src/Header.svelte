<script>
    import { onMount } from 'svelte';
    let customerid = null;
    let cart = [];

    onMount(() => {
        import('./kernel').then((Module) => {
            Module.onKernelKey('change:customerid', _customerid => {
                customerid = _customerid;
            });
            Module.onKernelKey('change:cart', _cart => {
                cart = _cart;
            });
            cart = Module.getSharedKernel('cart');
        })
    })

    export let title;
</script>
<style>
    .icon {
        vertical-align: middle;
    }

    h3 {
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    .nav-menu,
    .nav-order {
        margin-left: 3em;
        position: relative;
        z-index: 10;
    }

    .nav-profile {
        float: right;
    }

    .shoppingcart-items {
        position: absolute;
        width: 20px;
        height: 20px;
        color: white;
        font-weight: 700;
        z-index: 30;
        left: -10px;
        top: -10px;
        text-align: center;
        line-height: 20px;
    }

    .shoppingcart-items-badge {
        position: absolute;
        z-index: 20;
        color: white;
        --wired-fab-bg-color: crimson;
        left: -10px;
        top: -10px;
        padding: 10px;
        margin: 0;
    }
</style>
<wired-card class="layout-container">
    {#if !customerid}<a href="/"><img class="icon" src="/static/assets/24px.svg"> Login</a> - <h3>{title}</h3>{/if}
    {#if customerid}
    <a href="/"><img class="icon" src="/static/assets/24px.svg"> Home</a>
    - <h3>{title}</h3>
    <a class="nav nav-menu" href="/pizzamenu"><img class="icon" src="/static/assets/menu_book-24px.svg"> Pizza Menu</a>
    <a class="nav nav-order" href="/orderpizza"><img class="icon" src="/static/assets/shopping_cart-24px.svg"> 
        {#if cart.length > 0}
        <wired-fab class="shoppingcart-items-badge"></wired-fab>
        <div class="shoppingcart-items">{cart.length}</div>
        {/if}
        Order your Pizza(s)
    </a>
    <a class="nav nav-profile" href="/profile"><img class="icon" src="/static/assets/account_circle-24px.svg"> Edit profile</a>
    {/if}
</wired-card>  