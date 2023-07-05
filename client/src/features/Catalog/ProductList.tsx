import { Grid } from "@mui/material";
import { Product } from "../../App/models/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../App/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface props {
  products: Product[];
}

const ProductList = ({ products }: props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        // xs -> Extra small and anything bigger.
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
