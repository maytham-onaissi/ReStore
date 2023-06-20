import LoadingComponent from "../../App/Layout/LoadingComponent";
import agent from "../../App/api/agent";
import { Product } from "../../App/models/Product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
