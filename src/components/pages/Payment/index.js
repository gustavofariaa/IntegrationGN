import { useRouter } from 'next/router';

import * as Styles from './styles';

import PaymentTab from './PaymentTab';

import { useAlertContext } from '../../../context/Alert';

import { formatBRL, calcTotalItems } from '../../../utils/functions';
import api from '../../../utils/api';

export default function Payment({ payment }) {
  const router = useRouter();

  console.log(payment);

  const { showAlert } = useAlertContext();

  if (typeof payment === 'undefined') {
    return (
      <Styles.Container>
        <div className="wrapper spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Styles.Container>
    );
  }

  const goToHome = () => router.push('/');

  if (payment?.status === 'paid') {
    const { message } = payment?.history?.find?.((value) => value?.message?.includes?.(' efetuado em '));
    return (
      <Styles.Container className="text-secondary">
        <div className="wrapper text-center">
          <h1>Pagamento efetuado!</h1>
          <h2>{message ?? ''}</h2>
          <button type="button" className="mt-4 btn btn-primary text-light" onClick={goToHome}>
            <h5 className="m-0 p-2">Clique para continuar comprando</h5>
          </button>
        </div>
      </Styles.Container>
    );
  }

  if (payment?.status === 'canceled') {
    return (
      <Styles.Container className="text-secondary">
        <div className="wrapper text-center">
          <h1>OPS! 404</h1>
          <h2>Essa compra não existe mais</h2>
          <button type="button" className="mt-4 btn btn-primary text-light" onClick={goToHome}>
            <h5 className="m-0 p-2">Clique para continuar comprando</h5>
          </button>
        </div>
      </Styles.Container>
    );
  }

  if (payment === null) {
    return (
      <Styles.Container className="text-secondary">
        <div className="wrapper text-center">
          <h1>OPS! 404</h1>
          <h2>Carrinho não encontrado</h2>
          <button type="button" className="mt-4 btn btn-primary text-light" onClick={goToHome}>
            <h5 className="m-0 p-2">Clique para voltar para página inicial</h5>
          </button>
        </div>
      </Styles.Container>
    );
  }

  const itemsQuantity = payment?.items?.length ?? 0;
  const totalItems = calcTotalItems(payment?.items);
  const shipping = payment?.shippings?.[0]?.value ?? 0;
  const total = payment?.total ?? 0;

  const handleCancelPayment = async () => {
    const options = {
      title: 'Cancelar compra',
      message: 'Você realmente deseja cancelar sua compra?',
      cancelText: 'Continuar compra',
      confirmText: 'Sim',
      onClickConfirm: async () => {
        await api.get(`/api/payment/cancel/${payment?.charge_id}`);
        router.push('/');
      },
    };
    showAlert(options);
  };

  return (
    <Styles.Payment className="py-4 row">
      <div className="card col-7 p-3">
        <PaymentTab payment={payment} />
      </div>

      <div className="card col-4 p-3 ">
        <h6 className="py-0 m-0 text-secondary">
          <b>resumo do pedido</b>
        </h6>

        <Styles.PaymentDetails className="my-2">
          <p className="m-0">{`${itemsQuantity} produtos`}</p>
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

        {payment?.status === 'waiting' && (
          <button
            type="button"
            className="mt-1 mb-2 btn btn-primary text-light"
            onClick={goToHome}
          >
            Voltar para página inicial
          </button>
        )}

        <button
          type="button"
          className="mt-1 mb-2 btn btn-outline-secondary"
          onClick={handleCancelPayment}
        >
          Cancelar compra
        </button>

      </div>
    </Styles.Payment>
  );
}
