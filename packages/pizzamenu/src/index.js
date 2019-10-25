import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

const CatalogueContext = React.createContext();

const exampleItems = [
    { id: 10, name: 'Classic Hawaii', description: "The one that started it all!", price: 15 },
    { id: 11, name: 'Pineapple Bonanza', description: "Not just the ordinarily Hawaii :)", price: 20 },
    { id: 12, name: 'Citrus Crush', description: "Orange, Lime and Lemon.", price: 25 },
    { id: 13, name: 'Apple Cinnamon Crust', description: "The Cheesy American Apple Pizza Pie!", price: 30 },
    { id: 14, name: 'Pear & Fear', description: "Do you dare? Pear and chili sauce!", price: 35 },
    { id: 15, name: 'Banana Peanut Butter', description: "For the Elvis and Banana lovers.", price: 40 },
    { id: 16, name: 'Strawberry Field', description: "Strawberries, basil and garlic vinegar!", price: 50 },
    { id: 17, name: 'The Full Fruit Salad', description: "Do you really think you are worth it?", price: 75 },
]
const sleep = ms => new Promise(r => setTimeout(r, ms));
const sillyFetch = async () => {
    await sleep(250); 
    return exampleItems;
}

const CatalogueProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [customerid, setCustomerid] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        //This is where api calls for a pizzamenu could be handled, for now, faking it!
        const fetchPizzas = async () => {
            const pizzaMenu = await sillyFetch();
            setItems(pizzaMenu);
        }
        if( customerid !== null )fetchPizzas();
    }, [customerid]);

    useEffect(() => {
        import('./kernel')
            .then((module) => {
                module.onKernelKey('change:customerid', _customerid => {
                    setCustomerid(_customerid);
                });
                const _customerid = module.getSharedKernel('customerid');
                if (_customerid != null) {
                    setCustomerid(_customerid);
                }
                module.onKernelKey('change:cart', _cart => {
                     setCart(_cart);
                });
                const _cart = module.getSharedKernel('cart');
                if (_cart != null) {
                    setCart(module.getSharedKernel('cart'));
                }
            });
    }, []);

    const addToCart = (id, name, price) => {
        const _cart = cart.concat({ menuid: id, number: 1, name, price })
        import('./kernel').then((Module) => {
            Module.updateSharedKernel({ cart: _cart });
        })
    }

    const removeFromCart = id => {
        const _cart = cart.filter(item => item.menuid != id)
        import('./kernel').then((Module) => {
            Module.updateSharedKernel({ cart: _cart });
        })
    }

    return (
        <CatalogueContext.Provider value={[customerid, items, cart, addToCart, removeFromCart]}>
            {props.children}
        </CatalogueContext.Provider>
    );
}

function App() {

    return (
        <CatalogueProvider>
            <wired-card class="layout-container">
                <h2>Find Your Favorite Pizza!</h2>
                <Items></Items>
            </wired-card>
        </CatalogueProvider>
    );
}

function Item({ description, name, id, price, cart, addToCart, removeFromCart }) {

    const isInCart = cart.findIndex(el => el.menuid == id) > -1;

    return (
        <li className="catalogue-item" key={id}><wired-card class="layout-item">
            <h3 className="catalogue-title"> <img className="pizza-ill" src="/static/assets/pizza.svg"></img> {name}</h3>
            <div className="catalogue-description">{description}</div>
            <div className="catalogue-bar">Price: {price},- $
                {isInCart
                    ? <wired-icon-button onClick={() => removeFromCart(id)} class="catalogue-shoppingcart"> <img className="cart-ill" src="/static/assets/remove_shopping_cart-24px.svg"></img> </wired-icon-button>
                    : <wired-icon-button onClick={() => addToCart(id, name, price)} class="catalogue-shoppingcart"> <img className="cart-ill" src="/static/assets/add_shopping_cart-24px.svg"></img> </wired-icon-button>
                }
            </div>
        </wired-card></li>)
}

function Items() {
    const [customerid, items, cart, addToCart, removeFromCart] = useContext(CatalogueContext);
    return (
        customerid !== null
        ? <ul className="catalogue">
            {items.map(function (item) {
                return <Item key={item.id} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} {...item} />;
            })}
        </ul>
        : <h3><a href="/">Log in to</a> Pizza Heaven before doing anything here!</h3>
        );
}
export const ReactApp = (el) => ReactDOM.render(App(), el);