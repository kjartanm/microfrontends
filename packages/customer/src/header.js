import Header from './Header.svelte';


export const SvelteHeader = (el)=>{
	new Header({
		target: el,
		props: {
			title: 'Tropical Pizzas'
		}
	})
};