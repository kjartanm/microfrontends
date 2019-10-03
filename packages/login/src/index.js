import { component, useEffect } from 'haunted';
import { html, svg } from 'lit-html';

function LoginFE() {
    const update = (newState) => {
        import('./kernel').then((Module) => {
            Module.updateSharedKernel(newState);
        })
    }    
    return html`
    <section class="wc-module">
        <wired-card class="layout-container">
        <h1>Welcome to Tropical Pizzas!</h1>
        <h2>Pineapples was only the beginning! We bring you the full experience of fruit, cheese, dough and whatever!</h2>
            <wired-card class="layout-form">

                <h3>Log in or  register an account!</h3>
                <wired-input placeholder="User name"></wired-input>
                <wired-input type="password" placeholder="Password"></wired-input>

                <wired-button @click=${ () => update({customerid: '45645645'})}>Log in</wired-button>
                <wired-button>Register</wired-button>
            </wired-card>
        </wired-card>
    </section>`;
}
customElements.define('x-login', component(LoginFE, { useShadowDOM: false }));
