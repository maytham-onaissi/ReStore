import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../App/models/Product";
import agent from "../../App/api/agent";
import { RootState } from "../../App/store/configureStore";
import { MetaData } from "../../App/models/pagination";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}
const productAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);

  if (productParams.brands.length > 0)
    params.append("brands", productParams.brands.toString());

  if (productParams.types.length > 0)
    params.append("types", productParams.types.toString());

  return params;
};

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>(
  "catalog/fetchProductsAsync",
  // _ means void parameter or nothing to be expected or required.
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
    try {
      const response = await agent.Catalog.list(params);

      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      const product = await agent.Catalog.details(productId);
      return product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const initParams = () => {
  return { pageNumber: 1, pageSize: 6, orderBy: "name", brands: [], types: [] };
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
    setMetaData: (state, action) => {
      console.log(action);
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });

    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.status = "idle";
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;
