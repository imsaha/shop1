import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAPI from "./hooks/useApi";

export interface ProductDto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const setProducts = createAction<ProductDto[]>("PRODUCTS/SET");

export type ProductsState = {
  products?: ProductDto[];
};

const ProductsSlice = createSlice<
  ProductsState,
  SliceCaseReducers<ProductsState>
>({
  name: "products",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProducts, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const loadProductsAsync = createAsyncThunk(
  "PRODUCTS/LOAD",
  async (_, { dispatch }) => {
    try {
      const api = useAPI();
      const response = await api.get<ProductDto[]>("products");
      if (!response.ok) {
        throw response.data;
      }

      dispatch(setProducts(response.data ?? []));
    } catch (error) {
      console.log(error);
      dispatch(setProducts([]));
    }
  }
);

export default ProductsSlice.reducer;
