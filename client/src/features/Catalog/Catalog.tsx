import { Product } from "../../App/models/Product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
