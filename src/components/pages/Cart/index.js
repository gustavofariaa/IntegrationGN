import { useRouter } from 'next/router';
import { HiOutlineTrash } from 'react-icons/hi';

import * as Styles from './styles';

import { useCartContext } from '../../../context/Cart';

import { formatBRL } from '../../../utils/functions';
import api from '../../../utils/api';

export default function Cart() {
  const router = useRouter();

  const {
    items, totalItems, shipping, total, removeItemToCart,
  } = useCartContext();

  if (items.length <= 0) {
    const goToHome = () => router.push('/');
    return (
      <Styles.Container className="text-secondary">
        <div className="wrapper text-center">
          <h1>Que pena!</h1>
          <h2>Seu carrinho está vazio</h2>
          <button type="button" className="mt-4 btn btn-primary text-light" onClick={goToHome}>
            <h5 className="m-0 p-2">Clique aqui para continuar comprando</h5>
          </button>
        </div>
      </Styles.Container>
    );
  }

  const continueToPayment = async () => {
    const _items = items?.map?.((item) => ({ name: item.name, value: item.value, amount: 1 }));
    const data = {
      items: _items,
      shippings: [{ name: 'free', value: 0 }],
    };
    const { data: { charge_id: id } } = await api.post('/api/cart', data);
    router.push(`/payment/${id}`);
  };

  return (
    <Styles.Cart className="py-4 row">
      <div className="card col-7 p-3">
        {items?.map?.((item, index) => (
          <div key={index}>
            <Styles.Item key={index} className="p-2">
              <img src={item.image} alt="Product" />

              <div className="ms-4 wrapper-item">

                <div>
                  <p className="mb-1"><b>{item.name}</b></p>
                  <p>{formatBRL(item.value)}</p>
                </div>

                <Styles.RemoveItem type="Styles.Item" className="m-0 p-0 btn btn-outline-danger" onClick={() => removeItemToCart(item)}>
                  <HiOutlineTrash size={24} />
                </Styles.RemoveItem>
              </div>

            </Styles.Item>
            {(items?.length !== index + 1) && <hr className="my-2 bg-secondary" />}
          </div>
        ))}
      </div>

      <div className="card col-4 p-3 ">
        <h6 className="py-0 m-0 text-secondary">
          <b>resumo do pedido</b>
        </h6>

        <Styles.PaymentDetails className="my-2">
          <p className="m-0">{`${items?.length} produtos`}</p>
          <p className="m-0">{formatBRL(totalItems)}</p>

        </Styles.PaymentDetails>

        <Styles.PaymentDetails className={`mb-2 ${shipping === 0 ? 'text-success' : ''}`}>
          <p className="m-0">frete</p>
          <p className="m-0">{shipping === 0 ? 'Grátis' : formatBRL(shipping)}</p>
        </Styles.PaymentDetails>

        <hr className="my-2 bg-secondary" />

        <Styles.PaymentDetails className="my-3">
          <h5 className="m-0"><b>Total</b></h5>
          <h5 className="m-0"><b>{formatBRL(total)}</b></h5>
        </Styles.PaymentDetails>

        <button
          type="button"
          className="mt-1 mb-2 btn btn-primary text-light"
          onClick={continueToPayment}
        >
          Continuar
        </button>
      </div>
    </Styles.Cart>
  );
}
