import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

const CatalogueContext = React.createContext();

const exampleItems = [
  { id: 10, name: 'Classic Hawaii', description: "The one that started it all!", price: 15 },
  { id: 11, name: 'Pineapple Bonanza', description: "Not just the ordinarily Hawaii :)", price: 20 },
  { id: 12, name: 'Citrus Crush', description: "Orange, Lime and Lemon.", price: 25 },
  { id: 13, name: 'Apple Crust', description: "Cheese and Apple slices.", price: 30 },
  { id: 14, name: 'Pear & Fear', description: "Do you dare? Pear and chili sauce!", price: 35 },
  { id: 15, name: 'Banana Peanut Butter', description: "For the Elvis and Banana lovers.", price: 40 },
  { id: 16, name: 'Strawberry Field', description: "Strawberries, basil and garlic vinegar!", price: 50 },
  { id: 17, name: 'The Full Fruit Salad', description: "Do you think you are worth it?", price: 75 },
]

const CatalogueProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [customerid, setCustomerid] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    //This is where api calls for pizzamenu could be handled, for now, faking it!
    setItems(exampleItems);
  }, [customerid]);
  useEffect(() => {
    import('./kernel')
      .then((module) => {
        module.onKernelKey('change:customerid', customerid => {
          setCustomerid(customerid);
        });
        const customerid = module.getSharedKernel('customerid');
        if (customerid != null) {
          setCustomerid(customerid);
        }
        module.onKernelKey('change:cart', cart => {
          setCart(cart);
        });
        const cart = module.getSharedKernel('cart');
        if(cart != null){
          setCart(module.getSharedKernel('cart'));
        }
      });
  }, []);

  const addToCart = itemid => {
    console.log('add to cart')
  }

  const removeFromCart = itemid => {
    console.log('add to cart')
  }

  return (
    <CatalogueContext.Provider value={[items, cart, addToCart, removeFromCart]}>
      {props.children}
    </CatalogueContext.Provider>
  );
}

function App() {
  const addItemToCart = itemid => {
    console.log("add item to cart")
  }

  const removeItemFromToCart = itemid => {
    console.log("remove item from cart")
  }

  return (
    <CatalogueProvider>
      <wired-card class="layout-container">
        <h2>Find Your Favorite Pizza!</h2>
        <Items></Items>
      </wired-card>
    </CatalogueProvider>
  );
}

function Item({ description, name, id, cart, addToCart, removeFromCart }) {
  return (
    <li style={{ border: '0px solid red' }} className="catalogue-item" key={id}><wired-card class="layout-item">
      <h3 className="catalogue-title">{name}</h3>
      <div className="catalogue-description">{description}</div>
    </wired-card></li>)
}

function Items() {
  const [items, cart, addToCart, removeFromCart] = useContext(CatalogueContext);
  return (
    <ul className="catalogue">
      {items.map(function ( item ) {
        return <Item key={item.id} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} {...item} />;
      })}
    </ul>);
}
export const ReactApp = (el) => ReactDOM.render(App(), el);