import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { fetchProducts, setPage, searchProducts, setPageLimit, fetchCategories, setCategory, setSortBy, setOrder } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { StarIcon as OutlineStar, HeartIcon as OutlineHeart, PlusCircleIcon, MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
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
    <div className="max-w-full md:max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Nos produits</h1>
      <form
        className="w-full mx-auto flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(searchProducts(searchTerm));
        }}
      >
        <div className="relative w-full max-w-md m-auto">
          <input
            type="text"
            className="w-full bg-white bg-opacity-20 placeholder-white rounded-full border border-gray-300 text-white text-lg pl-4 pr-10 py-2 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Rechercher..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-40 text-white rounded-full p-2"
          >
            <MagnifyingGlassIcon className="w-4 h-4 m-auto" strokeWidth={2} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row m-auto gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-lg text-white dark:text-gray-200">Nombre de produits par page</label>
            <select
              id="itemsPerPage"
              value={pageLimit}
              onChange={(e) => dispatch(setPageLimit(Number(e.target.value)))}
              className="bg-white bg-opacity-20 placeholder-white rounded-full border border-gray-300 text-white text-lg pl-4 pr-10 py-2 focus:outline-none"
            >
              <option value={10} className="bg-gray-400 text-white">10</option>
              <option value={20} className="bg-gray-400 text-white">20</option>
              <option value={30} className="bg-gray-400 text-white">30</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="sortBy" className="text-lg text-white dark:text-gray-200">Trier par :</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => {
                dispatch(setSortBy(e.target.value));
              }}
              className="bg-white bg-opacity-20 placeholder-white rounded-full border border-gray-300 text-white text-lg pl-4 pr-10 py-2 focus:outline-none"
            >
              <option value="" className="bg-gray-400 text-white">Par défaut</option>
              <option value="price" className="bg-gray-400 text-white">Prix</option>
              <option value="rating" className="bg-gray-400 text-white">Meilleure note</option>
            </select>

            <select
              id="order"
              value={order}
              onChange={(e) => {
                dispatch(setOrder(e.target.value as "asc" | "desc"));
              }}
              className="bg-white bg-opacity-20 placeholder-white rounded-full border border-gray-300 text-white text-lg pl-4 pr-10 py-2 focus:outline-none"
            >
              <option value="asc" className="bg-gray-400 text-white">Ascendant</option>
              <option value="desc" className="bg-gray-400 text-white">Descendant</option>
            </select>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-2 p-3 text-white text-sm">
        <label htmlFor="categoryFilter" className="text-3xl font-semibold">Catégories :</label>
        <div className="flex gap-2 overflow-x-scroll change-scrollbar pb-2">
          <button
            onClick={() => dispatch(setCategory(""))}
            className={`px-6 py-2 w-fit rounded-full bg-white hover:bg-opacity-100 hover:text-gray-600 transition duration-300
               ${selectedCategory === ""
                ? "bg-white text-gray-600" // Sélectionné
                : "bg-white bg-opacity-20 text-white hover:bg-opacity-100 hover:text-gray-600"
              }`}
          >Toutes</button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => dispatch(setCategory(category.slug))}
              className={`px-6 py-2 w-fit rounded-full bg-white hover:bg-opacity-100 hover:text-gray-600 transition duration-300
                ${selectedCategory === category.slug
                  ? "bg-white text-gray-600" // Sélectionné
                  : "bg-white bg-opacity-20 text-white hover:bg-opacity-100 hover:text-gray-600"
                }`}
            >{category.name}</button>
          ))}
        </div>
      </div>
      {!items || items.length === 0 ? (
        <p className="text-center text-white text-xl my-24">Aucun produit trouvé</p>
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
      <div className="flex justify-between mt-8 text-white">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="w-fit rounded-full bg-white bg-opacity-20 border border-gray-100 enabled:hover:bg-gray-700 enabled:hover:bg-opacity-30 disabled:bg-gray-400 disabled:text-gray-300 disabled:border-gray-300 p-2 transition duration-300 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-10 h-10" />
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          className="w-fit rounded-full bg-white bg-opacity-20 border border-gray-100 enabled:hover:bg-gray-700 enabled:hover:bg-opacity-30 disabled:bg-gray-400 disabled:text-gray-300 disabled:border-gray-300 p-2 transition duration-300 disabled:cursor-not-allowed"
          disabled={currentPage * pageLimit >= total}
        >
          <ChevronRightIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default ProductList;
