import { useEffect, useState } from 'react';

import * as Styles from './styles';

import Item from '../Item';

import { shuffleItems } from '../../utils/functions';

import productsA from '../../utils/mock/products';

export default function ProductsList({ productId = null, itemWidth = 256 }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = productsA?.filter(({ id }) => id !== productId);
    setProducts(data);
  }, [productId]);

  return (
    <Styles.ProductsList itemWidth={itemWidth} className="my-4">
      {shuffleItems(products)?.map?.((product) => (
        <Item key={product?.id} product={product} width={itemWidth} />
      ))}
    </Styles.ProductsList>
  );
}
