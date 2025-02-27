import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { id } = useParams();

  if (!id) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  const product = useSelector((state: RootState) => state.products.items.find(p => p.id === parseInt(id)));

  if (!product) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-500 text-lg mb-2">Catégorie : {product.category}</p>
          <p className="text-gray-500 text-lg">Marque : {product.brand}</p>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Ajouter au panier
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Info */}
        <div>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-red-600 mb-4">
            Prix : {product.price} EUR <span className="text-sm text-gray-500">(-{product.discountPercentage}%)</span>
          </p>
          <p className="text-green-600 font-medium mb-4">{product.availabilityStatus}</p>
          <p className="text-gray-500 text-lg">Évaluation : {product.rating} / 5</p>
          <p className="text-gray-500 text-lg">Stock restant : {product.stock}</p>
        </div>

        {/* Metadata */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <p className="mb-2">SKU : {product.sku}</p>
          <p className="mb-2">Poids : {product.weight} kg</p>
          <p className="mb-2">
            Dimensions : {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
          </p>
          <p className="mb-2">Garantie : {product.warrantyInformation}</p>
          <p className="mb-2">Politique de retour : {product.returnPolicy}</p>
          <p className="mb-2">Livraison : {product.shippingInformation}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Commentaires</h2>
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow flex flex-col gap-4 border border-gray-200"
            >
              <div className="flex justify-between">
                <p className="font-semibold text-lg text-gray-800">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">Évaluation : {review.rating} / 5</p>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-400">
                Publié le : {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
