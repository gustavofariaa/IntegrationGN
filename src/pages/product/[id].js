import { useEffect, useState } from 'react';

import ProductPage from '../../components/pages/Product';

import products from '../../utils/mock/products';

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const product = products.find((_product) => _product.id === id);
  if (!product) return { props: { product: null } };
  return { props: { product } };
}

export default function Product({ product }) {
  const [currentProduct, setCurrentProduct] = useState('');

  useEffect(() => setCurrentProduct(product), [product]);

  return <ProductPage product={currentProduct} />;
}
