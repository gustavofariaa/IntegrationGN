import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import * as Styles from './styles';

import ProductList from '../../ProductList';

import { useCartContext } from '../../../context/Cart';
import { useAlertContext } from '../../../context/Alert';

import { formatBRL } from '../../../utils/functions';

export default function Product({ product }) {
  const router = useRouter();

  const [isInCart, setIsInCart] = useState(false);

  const { items, addItemToCart, removeItemToCart } = useCartContext();
  const { showAlert } = useAlertContext();

  useEffect(() => {
    const find = items?.find?.(({ id }) => id === product?.id);
    setIsInCart(!!find);
  }, [product]);

  if (typeof product === 'undefined') {
    return (
      <Styles.Container>
        <div className="wrapper spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Styles.Container>
    );
  }

  if (product === null) {
    const goToHome = () => router.push('/');
    return (
      <Styles.Container className="text-secondary">
        <div className="wrapper text-center">
          <h1>OPS! 404</h1>
          <h2>O produto não foi encontrado</h2>
          <button type="button" className="mt-4 btn btn-primary text-light" onClick={goToHome}>
            <h5 className="m-0 p-2">Clique para voltar para página Incial</h5>
          </button>
        </div>
      </Styles.Container>
    );
  }

  const handleAdd = () => {
    addItemToCart(product);
    setIsInCart(true);
    const options = {
      title: 'Produto adicionado',
      message: 'O que você deseja fazer agora?',
      cancelText: 'Ir para carrinho',
      onClickCancel: () => { router.push('/cart'); },
      confirmText: 'Continuar comprando',
    };
    showAlert(options);
  };

  const handleRemove = () => {
    const options = {
      title: 'Remover item',
      message: `Você relamente deseja remover ${product.name} do seu carrinho?`,
      cancelText: 'Cancelar',
      confirmText: 'Remover',
      onClickConfirm: () => {
        removeItemToCart(product);
        setIsInCart(false);
      },
    };
    showAlert(options);
  };

  return (
    <div>
      <Styles.Product className="my-4 g-1 row">
        <div className="product-presentation card col-7">
          <img src={product?.image} className="p-4 card-img-top" alt="Product" />

          <div className="p-4 product-description">
            <h4>{product?.name}</h4>
            <p className="text-secondary">{product?.description}</p>
          </div>

        </div>

        <div className="p-4 product-order card col-4">
          <div className="product-price">
            <h3 className="m-0"><b>{formatBRL(product?.value)}</b></h3>
            <p className="m-0 text-secondary">
              {'em até 3x sem juros no '}
              <b>cartão de crédito</b>
            </p>

            <p className="m-0 mt-2 text-secondary payment-details">mais detalhes</p>
          </div>

          <hr className="bg-secondary" />

          <div>
            <p className="mb-0 text-secondary">calcular frete</p>
            <div className="mt-1 mb-2 input-group">
              <input type="text" className="form-control" placeholder="Digite o CEP" />
              <button className="btn btn-outline-secondary" type="button">OK</button>
            </div>
          </div>

          <hr className="bg-secondary" />

          <button
            type="button"
            className={`mt-1 mb-2 btn btn-${isInCart ? 'outline-primary' : 'primary text-light'}`}
            onClick={isInCart ? handleRemove : handleAdd}
          >
            {isInCart ? 'Remover' : 'Comprar'}
          </button>
        </div>
      </Styles.Product>

      <h5 className="py-0 m-0 px-1 text-secondary">
        <b>aproveite e veja também</b>
      </h5>

      <ProductList productId={product?.id} itemWidth={180} />

    </div>
  );
}
