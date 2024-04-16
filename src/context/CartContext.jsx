import { createContext } from "react";

export const CartContext = createContext({
  state: {
    isLoading: true,
    cart: [],
    msg: "",
  },
  addCart: () => {},
  getCart: () => {},
  deleteItem: () => {},
});

