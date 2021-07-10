import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Browse from "./components/Browse";
import Arrived from "./components/Arrived";
import Clients from "./components/Clients";
import AsideMenu from "./components/AsideMenu";
import Footer from "./components/Footer";
import Offline from "./components/Offline";
import Splash from "./pages/Splash";
import Profile from "./pages/Profile";
import Details from "./pages/Details";
import Cart from "./pages/Cart";

function App({ cart }) {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(true);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  React.useEffect(
    function () {
      (async function () {
        const response = await fetch(
          "https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc",
          {
            headers: {
              "Content-type": "application/json",
              accept: "application/json",
              "x-api-key": process.env.REACT_APP_APIKEY,
            },
          }
        );
        const { nodes } = await response.json();
        setItems(nodes);
        const script = document.createElement("script");
        script.src = "/js/carousel.js";
        script.async = false;
        document.body.appendChild(script);
      })();

      handleOfflineStatus();
      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

      setTimeout(function () {
        setIsLoading(false);
      }, 1500);

      return function () {
        window.removeEventListener("online", handleOfflineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
      };
    },
    [offlineStatus]
  );
  if (isLoading === true) {
    return (
      <>
        <Splash />
      </>
    );
  } else {
    return (
      <>
        {offlineStatus && <Offline />}
        <Header mode="light" cart={cart} />
        <Hero />
        <Browse />
        <Arrived items={items} />
        <Clients />
        <AsideMenu />
        <Footer />
      </>
    );
  }
}

export default function Routes() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = React.useState([]);
  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item }];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }
  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function (item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }
  React.useEffect(
    function () {
      console.info("useEffect for localStorage");
      if (cachedCart !== null) {
        setCart(JSON.parse(cachedCart));
      }
    },
    [cachedCart]
  );
  return (
    <Router>
      <Route path="/" exact>
        <App cart={cart} />
      </Route>
      <Route path="/profile" exact component={Profile} />
      <Route path="/details/:id">
        <Details handleAddToCart={handleAddToCart} cart={cart} />
      </Route>
      <Route path="/cart">
        <Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />
      </Route>
    </Router>
  );
}
