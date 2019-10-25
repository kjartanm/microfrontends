import { component, useEffect, useState } from 'haunted';
//import { html } from 'lit-html';
//import { html } from 'https://cdn.pika.dev/lighterhtml';
import { html } from 'lighterhtml-plus';
import WiredElements from 'wired-elements';

function LoginFE() {
    const [customerid, setUserid] = useState(null);
    useEffect(() => {
        import('./kernel').then((Module) => {
            Module.onKernelKey('change:customerid', _customerid => {
                setUserid(_customerid);
            });
            setUserid(Module.getSharedKernel('customerid'));
        })
      }, []);    

    const update = (newState) => {
        import('./kernel').then((Module) => {
            Module.updateSharedKernel(newState);
        })
    }    
    return html`
    <section class="wc-module">
        <wired-card class="layout-container">
        <img style="float: right; width: 300px; height: 300px;" src="/static/assets/pizza.svg">
        <h1>Welcome to Tropical Pizzas!</h1>
        <h2>Pineapples was only the beginning! We bring you the full experience of fruit, cheese, dough and whatever!</h2>
        ${customerid == null
            ?html`
                <wired-card class="layout-form">
                    <h3>Log in or register an account!</h3>
                    <wired-input placeholder="User name"></wired-input>
                    <wired-input type="password" placeholder="Password"></wired-input>

                    <wired-button onclick=${ () => update({customerid: '45645645'})}>Log in</wired-button>
                    <wired-button>Register</wired-button>
                </wired-card>            
                `
            :html`<h2>(You are already logged in, go to <a href="/pizzamenu">menu</a> :)</h2>`

        }
        </wired-card>
    </section>`;
}
customElements.define('x-login', component(LoginFE, { useShadowDOM: false }));
 