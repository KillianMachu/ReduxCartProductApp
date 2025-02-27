import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { fetchProducts, setPage, searchProducts, setPageLimit, fetchCategories, setCategory, setSortBy, setOrder } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { StarIcon as OutlineStar, HeartIcon as OutlineHeart, PlusCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar, HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

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

const ProductList = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { items, isLoading, currentPage, total, search, pageLimit, categories, selectedCategory, sortBy, order, wishlistItems } = {
    items: useSelector((state: RootState) => state.products.items),
    isLoading: useSelector((state: RootState) => state.products.isLoading),
    currentPage: useSelector((state: RootState) => state.products.currentPage),
    total: useSelector((state: RootState) => state.products.total),
    search: useSelector((state: RootState) => state.products.search),
    pageLimit: useSelector((state: RootState) => state.products.pageLimit),
    categories: useSelector((state: RootState) => state.products.categories),
    selectedCategory: useSelector((state: RootState) => state.products.selectedCategory),
    sortBy: useSelector((state: RootState) => state.products.sortBy),
    order: useSelector((state: RootState) => state.products.order),
    wishlistItems: useSelector((state: RootState) => state.wishlist.items),
  }

  const [searchTerm, setSearchTerm] = useState(search);

  React.useEffect(() => {
    dispatch(fetchProducts({ currentPage: currentPage || 1, limit: pageLimit, search, selectedCategory, sortBy, order }));
    dispatch(fetchCategories());
  }, [dispatch, currentPage, pageLimit, search, selectedCategory, sortBy, order]);

  const isItemInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id);
  }

  if (isLoading) return (
    <div className="flex flex-1 flex-row gap-2 h-full justify-center items-center">
      <div className="w-6 h-6 rounded-full bg-gray-300 animate-bounce"></div>
      <div className="w-6 h-6 rounded-full bg-gray-300 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-6 h-6 rounded-full bg-gray-300 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Nos produits</h1>
      <form
        className="w-full max-w-md mx-auto flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(searchProducts(searchTerm));
        }}
      >
        <div className="relative w-full">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-4 pr-10 py-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Rechercher..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-700 dark:text-gray-200">Articles par page</label>
          <select
            id="itemsPerPage"
            value={pageLimit}
            onChange={(e) => dispatch(setPageLimit(Number(e.target.value)))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="categoryFilter" className="text-sm text-gray-700 dark:text-gray-200">Catégories :</label>
          <select
            id="categoryFilter"
            value={selectedCategory || ""}
            onChange={(e) => dispatch(setCategory(e.target.value || null))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
          >
            <option value="">Toutes</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="text-sm text-gray-700 dark:text-gray-200">Trier par :</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => {
              dispatch(setSortBy(e.target.value));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
          >
            <option value="">Par défaut</option>
            <option value="price">Prix</option>
            <option value="rating">Meilleure note</option>
          </select>

          <select
            id="order"
            value={order}
            onChange={(e) => {
              dispatch(setOrder(e.target.value as "asc" | "desc"));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
          >
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
      </form>
      <div className="flex flex-col gap-2 p-3 text-white text-sm">
        <label htmlFor="categoryFilter" className="text-3xl font-semibold">Catégories :</label>
        <div className="flex gap-2 overflow-scroll scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => dispatch(setCategory(category.slug))}
              className="px-6 py-2 w-fit rounded-full bg-white bg-opacity-20 hover:bg-opacity-100 hover:text-gray-600 transition duration-300"
            >{category.name}</button>
          ))}
        </div>
        <select
          id="categoryFilter"
          value={selectedCategory || ""}
          onChange={(e) => dispatch(setCategory(e.target.value || null))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
        >
          <option value="">Toutes</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </div>
      {!items || items.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Aucun item trouvé</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((product) => (
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
          ))}
        </div>
      )}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded enabled:hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded enabled:hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage * pageLimit >= total}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
