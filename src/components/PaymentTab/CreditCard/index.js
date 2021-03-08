/* eslint-disable camelcase */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import moment from 'moment';

import * as Styles from './styles';

import AddressForm from '../Form/Address';
import CustomerForm from '../Form/Customer';
import CardForm from '../Form/Card';

import { getPaymentToken } from '../../../utils/functions';

import { useCartContext } from '../../../context/Cart';

import api from '../../../utils/api';

export default function CreditCard({ payment = {}, subscription = {} }) {
  const router = useRouter();

  const { clearCart } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreditCardPayment = async (values) => {
    setIsLoading(true);
    const { card } = values;

    await getPaymentToken(card, async (error, response) => {
      if (error) return;
      const { customer, billing_address } = values;
      const { data: { payment_token } } = response;

      const {
        name, cpf, birth,
        phone_number, email,
      } = customer;

      const { zipcode } = billing_address;

      const CPF = String(cpf.replace(/\D/g, ''));
      const PHONE = String(phone_number.replace(/\D/g, ''));
      const BIRTH = moment(birth).format('YYYY-MM-DD');
      const ZIPCODE = String(zipcode.replace(/\D/g, ''));

      const id = payment?.charge_id ?? subscription?.subscription_id;
      const data = {
        payment: {
          credit_card: {
            payment_token,
            billing_address: {
              ...billing_address,
              zipcode: ZIPCODE.toString(),
            },
            customer: {
              cpf: CPF.toString(),
              phone_number: PHONE.toString(),
              birth: BIRTH,
              name,
              email,
            },
          },
        },
      };

      try {
        if (payment?.charge_id) {
          await api.post(`/api/pay/${id}`, { ...data, installments: 1 });
          clearCart();
          router.reload();
          return;
        }
        const { data: { charge: { id: paymentId } } } = await api.post(`/api/club/pay/${id}`, data);
        router.push(`payment/${paymentId}`);
        return;
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    });
  };

  return (
    <Styles.CreditCard>
      <Formik
        initialValues={{
          card: {
            brand: '',
            number: '',
            cvv: '',
            expiration_month: '',
            expiration_year: '',
            payment_token: '',
          },
          customer: {
            name: '',
            email: '',
            cpf: '',
            birth: '',
            phone_number: '',
          },
          billing_address: {
            street: '',
            number: '',
            neighborhood: '',
            zipcode: '',
            city: '',
            state: '',
          },
        }}
        onSubmit={handleCreditCardPayment}
      >
        {(form) => (
          <Form>
            <div className="mt-2 mb-3 row g-3">
              <CardForm form={form} isLoading={isLoading} />
              <CustomerForm form={form} isLoading={isLoading} />
              <AddressForm form={form} isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="mt-3 btn btn-primary text-light"
                disabled={isLoading}
              >
                {!isLoading ? 'Pagar com cartão'
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
    </Styles.CreditCard>
  );
}
