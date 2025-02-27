import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

// Cart
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity ?? 0), 0).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-white text-xl my-24">Votre panier est vide.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cartItems.map((item) => (
            <Link to={`/products/${item.id}`} key={item.id} className="bg-white p-3 rounded-3xl bg-opacity-15 hover:bg-opacity-20 transition duration-300 text-white flex flex-col md:flex-row items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover bg-gray-300 rounded-xl"
              />
              <div className="flex flex-col md:flex-row justify-between w-full">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
                  <p className="text-white mb-2">Prix: {(item.price * (item.quantity ?? 0)).toFixed(2)} €</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault;
                        dispatch(updateQuantity({ id: item.id, quantity: (item.quantity ?? 1) - 1 }));
                      }
                      }
                      disabled={(item.quantity ?? 0) <= 1}
                      className="w-fit rounded-full bg-white bg-opacity-20 border border-gray-100 enabled:hover:bg-gray-700 enabled:hover:bg-opacity-30 disabled:bg-gray-400 disabled:text-gray-300 disabled:border-gray-300 p-2 transition duration-300 disabled:cursor-not-allowed"
                    >
                      <MinusIcon className="w-6 h-6" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onClick={(e) => e.preventDefault()}
                      onChange={(e) =>
                        dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))
                      }
                      className="w-20 bg-white bg-opacity-20 placeholder-white rounded-full border border-gray-300 text-white text-lg px-4 py-2 focus:outline-none"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(updateQuantity({ id: item.id, quantity: (item.quantity ?? 0) + 1 }));
                      }}
                      className="w-fit rounded-full bg-white bg-opacity-20 border border-gray-100 enabled:hover:bg-gray-700 enabled:hover:bg-opacity-30 p-2 transition duration-300"
                    >
                      <PlusIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeFromCart(item.id));
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 h-fit md:m-auto mt-4"
                >
                  Supprimer
                </button>
              </div>
            </Link>
          ))}
          <div className="col-span-full text-right">
            <h2 className="text-2xl font-bold text-white">Total: {calculateTotal()} €</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
