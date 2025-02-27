import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductCard from "./ProductCard";

const Wishlist = () => {
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
                        <ProductCard product={item}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;