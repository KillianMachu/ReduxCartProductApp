import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import StarRating from "./StarRating";
import { Product } from "../store/productSlice";
import { Link } from "react-router-dom";
import { HeartIcon as OutlineHeart, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch() as AppDispatch;
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

    const isItemInWishlist = (id: number) => {
        return wishlistItems.some((item) => item.id === id);
    }

    return (
        <Link to={`/products/${product.id}`} key={product.id} className="hover:bg-white p-3 rounded-3xl hover:bg-opacity-20 transition duration-300 text-white">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full aspect-square object-cover shadow-xl bg-gray-300 rounded-xl mb-4"
            />
            <div className="leading-[.5rem] flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="mb-2 font-light">{product.price} €</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col gap-2">
                    <span className="text-sm flex gap-4"><StarRating rating={product.rating} />{/* ({product.rating} / 5)*/}</span>
                    <span className="text-tr text-sm font-medium">
                        {product.reviews.length} Avis
                    </span>
                </div>
                <div className="flex">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(toggleWishlist(product));
                        }}
                        className="m-1 w-fit rounded-full bg-white bg-opacity-20 hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300"
                    >
                        {isItemInWishlist(product.id) ? (
                            <SolidHeart className="w-10 h-10" />
                        ) : (
                            <OutlineHeart className="w-10 h-10" />
                        )}
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(addToCart(product));
                        }}
                        className="m-1 w-fit rounded-full bg-white bg-opacity-20 hover:bg-gray-700 hover:bg-opacity-30 p-2 transition duration-300"
                    >
                        <PlusCircleIcon className="w-10 h-10" />
                    </button>
                </div>
            </div>

        </Link>
    );
}

export default ProductCard;