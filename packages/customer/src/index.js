import App from './App.svelte';

export const SvelteApp = (el)=>{
	new App({
		target: el,
		props: {
			title: 'Edit your profile:'
		}
	})
};