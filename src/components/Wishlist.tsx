import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React from "react";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { StarIcon as OutlineStar, PlusCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar, HeartIcon } from "@heroicons/react/24/solid";

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">

            {[...Array(5)].map((value, index) => (
                index < Math.floor(rating) ? (
                    <SolidStar key={index} className="w-4 h-4" />
                ) : (
                    <OutlineStar key={index} className="w-4 h-4" />
                )
            ))}
        </div>
    );
}

const Wishlist = () => {
    const dispatch = useDispatch() as AppDispatch;
    const { items } = {
        items: useSelector((state: RootState) => state.wishlist.items),
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white text-center mb-8">Votre Liste de Souhaits</h1>
            {items.length === 0 ? (
                <p className="text-center text-white text-xl my-24">Votre liste de souhaits est vide.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <Link to={`/products/${item.id}`} key={item.id} className="hover:bg-white p-3 rounded-3xl hover:bg-opacity-20 transition duration-300 text-white">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full aspect-square object-cover shadow-xl bg-gray-300 rounded-xl mb-4"
                            />
                            <div className="leading-[.5rem] flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="mb-2 font-light">{item.price} €</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm flex gap-4"><StarRating rating={item.rating} />{/* ({item.rating} / 5)*/}</span>
                                    <span className="text-tr text-sm font-medium">
                                        {item.reviews.length} Avis
                                    </span>
                                </div>
                                <div className="flex">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(toggleWishlist(item));
                                        }}
                                        className="m-1 w-fit rounded-full bg-white bg-opacity-20 hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300"
                                    >
                                        <HeartIcon className="w-10 h-10" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(addToCart(item));
                                        }}
                                        className="m-1 w-fit rounded-full bg-white bg-opacity-20 hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300"
                                    >
                                        <PlusCircleIcon className="w-10 h-10" />
                                    </button>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;