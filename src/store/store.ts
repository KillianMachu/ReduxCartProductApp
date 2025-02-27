import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice
  },
  // Ajout des middleware par défaut (utile pour des middlewares additionnels)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Types pour le typage de l'état global et des dispatchs
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;