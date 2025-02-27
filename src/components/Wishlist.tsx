import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React from "react";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const dispatch = useDispatch() as AppDispatch;
    const { items } = {
        items: useSelector((state: RootState) => state.wishlist.items),
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Votre Liste de Souhaits</h1>
        {items.length === 0 ? (
            <p className="text-center text-gray-500">Votre liste de souhaits est vide.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-2">Prix: {item.price.toFixed(2)} EUR</p>
                    <div className="flex items-center gap-2">
                    <Link
                        to={`/product/${item.id}`}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                    >
                        Voir le produit
                    </Link>
                    <button
                        onClick={() => dispatch(toggleWishlist(item))}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                    >
                        Retirer à la wishlist
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default Wishlist;