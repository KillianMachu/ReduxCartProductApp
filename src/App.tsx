import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { HomeIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Wishlist";

const App = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  let totalItems = 0;
  cartItems.forEach((item) => {
    totalItems += item.quantity ?? 0;
  });
  return (
    <Router>
      <div className="min-w-screen min-h-screen bg-[url(/public/background3.jpg)] bg-cover backdrop-blur-3xl bg-fixed font-content">
        <div className="min-w-screen min-h-screen flex flex-col bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100 p-4">
          <nav className="flex justify-center bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100 mx-auto w-fit px-4 text-white font-semibold gap-2">
            <Link className="m-1 rounded-full hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300" to="/"><HomeIcon className="h-8 w-8" /></Link>
            <Link className="m-1 rounded-full hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300" to="/wishlist"><HeartIcon className="h-8 w-8" /></Link>
            <Link className="m-1 rounded-full hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300 relative" to="/cart"><ShoppingCartIcon className="h-8 w-8" />{totalItems === 0 ? '' : <span className="absolute top-2 right-2 flex h-4 w-4 bg-gray-600 text-white text-sm rounded-full justify-center items-center">{totalItems}</span>}</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
