import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  thumbnail: string;
  category: string;
  brand: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  weight: number;
  shippingInformation: string;
  sku: string;
  returnPolicy: string;
  reviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
// Product Slice
export const fetchProducts = 
  createAsyncThunk(
    "products/fetchProducts",
    async ({ currentPage, limit, search, selectedCategory, sortBy, order }: { currentPage: number, limit: number, search: string, selectedCategory: string, sortBy: string, order: string }) => {
      const skip = (currentPage - 1) * limit;
      let url = `https://dummyjson.com/products`
      let params = `limit=${limit}&skip=${skip}`;
      if (sortBy && order) {
        params += `&sortBy=${sortBy}&order=${order}`;
      }

      if (search && !selectedCategory) {
        url += `/search?q=${search}&${params}`
      } else if (selectedCategory && !search) {
        url += `/category/${selectedCategory}?${params}`;
      } else if (selectedCategory && search) {
        params = sortBy.length > 0 && order ? `sortBy=${sortBy}&order=${order}` : "";
        let $categoryUrl = `${url}/category/${selectedCategory}?${params}`;
        let $searchUrl = `${url}/search?q=${search}&${params}`;

        const categoryResponse = await fetch($categoryUrl);
        const categoryJsonResponse = await categoryResponse.json()

        const searchResponse = await fetch($searchUrl);
        const searchJsonResponse = await searchResponse.json()

        const searchProductIds = new Set(searchJsonResponse.products.map((product: Product) => product.id));

        const filteredProducts = categoryJsonResponse.products.filter((product: Product) => searchProductIds.has(product.id))

        return {products: filteredProducts.slice(skip, skip + limit), total: filteredProducts.length}
      } else {
        url += `?${params}`
      }
      
      const response = await fetch(url);
      const jsonResponse = await response.json()
      console.log(url)
      return jsonResponse
    }
  );

export const fetchCategories =
  createAsyncThunk(
    "products/fetchCategories",
    async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const jsonResponse = await response.json()
      return jsonResponse
    }
  );

const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
  total: number;
  search: string;
  pageLimit: number;
  categories: Category[];
  selectedCategory: string;
  sortBy: string;
  order: string;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
  total: 0,
  search: "",
  pageLimit: 10,
  categories: [],
  selectedCategory: "",
  sortBy: "",
  order: "asc",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },

    searchProducts: (state, action) => {
      state.search = action.payload
    },

    setPageLimit: (state, action) => {
      state.pageLimit = action.payload
      state.currentPage = 1
    },

    setCategory: (state, action) => {
      state.selectedCategory = action.payload
      state.currentPage = 1
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },

    setOrder: (state, action) => {
      state.order = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload.products
      state.total = action.payload.total
      state.isLoading = false
    })
    .addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setPage, searchProducts, setPageLimit, setCategory, setSortBy, setOrder } = productSlice.actions;
export default productSlice.reducer;