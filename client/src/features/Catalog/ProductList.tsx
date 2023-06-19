import { Grid } from "@mui/material";
import { Product } from "../../App/models/Product";
import ProductCard from "./ProductCard";

interface props {
  products: Product[];
}

const ProductList = ({ products }: props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        // xs -> Extra small and anything bigger.
        <Grid item xs={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
