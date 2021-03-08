/* eslint-disable camelcase */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import moment from 'moment';

import * as Styles from './styles';

import CustomerForm from '../Form/Customer';

import { useCartContext } from '../../../context/Cart';

import api from '../../../utils/api';

export default function BankingBillet({ payment = {}, subscription = {} }) {
  const router = useRouter();

  const { clearCart } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleBankingBilletPayment = async ({ customer }) => {
    setIsLoading(true);

    const {
      name, cpf, birth,
      phone_number, email,
    } = customer;

    const CPF = String(cpf.replace(/\D/g, ''));
    const PHONE = String(phone_number.replace(/\D/g, ''));
    const BIRTH = moment(birth).format('YYYY-MM-DD');

    const expireAt = moment().add(3, 'days').format('YYYY-MM-DD');
    const id = payment?.charge_id ?? subscription?.subscription_id;
    const data = {
      payment: {
        banking_billet: {
          expire_at: expireAt,
          customer: {
            cpf: CPF,
            phone_number: PHONE,
            birth: BIRTH,
            name,
            email,
          },
        },
      },
    };

    try {
      if (payment?.charge_id) {
        await api.post(`/api/pay/${id}`, data);
        clearCart();
        router.reload();
        return;
      }
      const { data: { charge: { id: paymentId } } } = await api.post(`/api/club/pay/${id}`, data);
      router.push(`payment/${paymentId}`);
      return;
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Styles.BankingBillet>
      <Formik
        initialValues={{
          customer: {
            name: '',
            email: '',
            cpf: '',
            birth: '',
            phone_number: '',
          },
        }}
        onSubmit={handleBankingBilletPayment}
      >
        {(form) => (
          <Form>
            <div className="mt-2 mb-3 row g-3">
              <CustomerForm form={form} isLoading={isLoading} />
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="mt-3 btn btn-primary text-light"
                disabled={isLoading}
              >
                {!isLoading ? 'Gerar boleto'
                  : (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Styles.BankingBillet>
  );
}
