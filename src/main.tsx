import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./app/store";
import "./index.css";

const saveCartToLocalStorage = () => {
  const cart = store.getState().cart.items;

  localStorage.setItem(
    "tamasha-cart",
    JSON.stringify(cart)
  );
};

// Save cart whenever Redux state changes
let previousCart = store.getState().cart.items;

store.subscribe(() => {
  const currentCart = store.getState().cart.items;

  if (currentCart !== previousCart) {
    previousCart = currentCart;
    saveCartToLocalStorage();
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);