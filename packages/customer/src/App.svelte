<script>
    import { onMount } from 'svelte';
    import { customerid, profile } from './stores.js';


    onMount( () => {

    })

    export let title;
</script>

<wired-card class="layout-container">
    <h2>{title}</h2>
    {#if $profile != null}
    <h3>{$profile.name}</h3>
    {:else}
    <h3>Loading profile ...</h3>
    {/if}
    
</wired-card>