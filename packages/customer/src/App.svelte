<script>
    import { onMount } from 'svelte';
    import { customerid, profile } from './stores.js';


    onMount( () => {

    })

    export let title;
</script>

<wired-card class="layout-container">
    <h2>{title}</h2>
    {#if $customerid === null}
    <h3><a href="/login">Log in to</a> Pizza Heaven before doing anything here!</h3>
    {:else if $profile === null }  
    <h3>Loading profile ...</h3>
    {:else}
    <h3>{$profile.name}</h3>
    {/if}
    
</wired-card>