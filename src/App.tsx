import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { HomeIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Wishlist";

const App = () => {
  return (
    <Router>
      <div className="min-w-screen min-h-screen bg-[url(/public/background3.jpg)] bg-cover backdrop-blur-3xl bg-fixed font-content">
        <div className="min-w-screen min-h-screen flex flex-col bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100 p-4">
          <nav className="flex justify-center bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100 mx-auto w-fit px-4 text-white font-semibold gap-2">
            <Link className="m-1 rounded-full hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300" to="/"><HomeIcon className="h-8 w-8" /></Link>
            <Link className="m-1 rounded-full hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300" to="/wishlist"><HeartIcon className="h-8 w-8" /></Link>
            <Link className="m-1 rounded-full hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300" to="/cart"><ShoppingCartIcon className="h-8 w-8" /></Link>
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
