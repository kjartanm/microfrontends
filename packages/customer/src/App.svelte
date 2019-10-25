<script>
    import { onMount } from 'svelte';
    import ProfileForm from './ProfileForm.svelte';
    import { customerid, profile } from './stores.js';


    onMount( () => {

    })

	function handleSubmit(fromProfileForm) {
        console.log( "update profile", fromProfileForm.detail );
	}

    export let title;
</script>

<wired-card class="layout-container">
    <h2>{title}</h2>
    {#if $customerid === null}
    <h3><a href="/">Log in to</a> Pizza Heaven before doing anything here!</h3>
    {:else if $profile === null }  
    <h3>Loading profile ...</h3>
    {:else}
    <ProfileForm on:submit={handleSubmit} {...$profile} />
    {/if}
    
</wired-card>