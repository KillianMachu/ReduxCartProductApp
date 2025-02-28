import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { Squares2X2Icon, TagIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import StarRating from "./StarRating";

const ProductDetails = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { id } = useParams();

  if (!id) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  const product = useSelector((state: RootState) => state.products.items.find(p => p.id === parseInt(id)));

  if (!product) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  const [isVisibleInfos, setIsVisibleInfos] = React.useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg bg-gray-300"
        />
        <div className="h-full flex flex-col justify-around">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>
            <div className="flex gap-4 mb-4">
              <p className="flex px-6 py-2 w-fit items-center gap-2 rounded-full bg-white bg-opacity-20 text-white"><Squares2X2Icon className="w-6 h-6 text-white" /> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
              <p className="flex px-6 py-2 w-fit items-center gap-2 rounded-full bg-white bg-opacity-20 text-white"><TagIcon className="w-6 h-6 text-white" /> {product.brand}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm flex gap-4 text-gray-300 mb-4"><StarRating rating={product.rating} /> {product.rating}/5</p>
              <p className="text-gray-300 flex">Stock restant : {product.stock} (<span className="text-green-300 font-medium mb-4">{product.availabilityStatus}</span>)</p>
            </div>
            <p className="text-gray-100 text-lg mb-6">{product.description}</p>
          </div>
          <div className="flex justify-between text-white items-center">
            <p className="text-4xl font-semibold mb-4">
              {product.price} € <span className="text-sm text-gray-300">(-{product.discountPercentage}%)</span>
            </p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="m-1 w-fit rounded-full bg-white hover:bg-opacity-20 hover:bg-gray-700 text-gray-600 hover:text-white border border-white px-4 py-2 transition duration-100 text-xl"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* Metadata */}
      <div className="mt-10 bg-white bg-opacity-20 placeholder-white border-y border-gray-300 text-white p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Informations</h3>
          <button
            onClick={() => setIsVisibleInfos(!isVisibleInfos)}
            className="text-white">
            {isVisibleInfos ? <ChevronUpIcon className="w-8 h-8 text-white" strokeWidth={3} /> : <ChevronDownIcon className="w-8 h-8 text-white" strokeWidth={3} />}
            </button>
        </div>
        {isVisibleInfos && (
          <div className="mt-5">
            <p className="mb-2">SKU : {product.sku}</p>
            <p className="mb-2">Poids : {product.weight} kg</p>
            <p className="mb-2">
              Dimensions : {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
            <p className="mb-2">Garantie : {product.warrantyInformation}</p>
            <p className="mb-2">Politique de retour : {product.returnPolicy}</p>
            <p className="mb-2">Livraison : {product.shippingInformation}</p>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-white mb-6">Commentaires</h2>
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 placeholder-white border border-gray-300 text-white p-6 rounded-lg shadow flex flex-col gap-4"
            >
              <div className="flex justify-between">
                <p className="font-semibold text-lg text-white">{review.reviewerName}</p>
                <p className="text-sm text-gray-100">Évaluation : {review.rating} / 5</p>
              </div>
              <p className="text-gray-100">{review.comment}</p>
              <p className="text-sm text-gray-100">
                Publié le : {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default ProductDetails;
