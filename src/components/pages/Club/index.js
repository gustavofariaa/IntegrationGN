import { useState } from 'react';
import { Form, Formik } from 'formik';

import * as Styles from './styles';

import InputText from '../../InputText';
import PaymentTab from '../../PaymentTab';

import api from '../../../utils/api';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscripted, setIsSubscripted] = useState(false);
  const [subscription, setSubscription] = useState({});

  const handleSubscripted = async ({ email }) => {
    setIsLoading(true);
    try {
      const body = { email };
      const { data } = await api.post('/api/club', body);
      setSubscription(data);
      setIsLoading(false);
      setIsSubscripted(true);
      return;
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Styles.Club className="py-4 row">
      <Styles.Banner className="py-5 text-center text-light bg-danger rounded">
        BEM VINDO(A) AO CLUBE DE OFERTAS
      </Styles.Banner>

      <Styles.Wrapper className="py-4 row">

        <div className="card col-4 p-3">
          {isSubscripted
            ? (
              <h6 className="py-0 m-0 text-secondary">
                <b>Estamos aguradando a sua inscrição</b>
              </h6>
            )
            : (
              <Formik
                initialValues={{ email: '' }}
                onSubmit={handleSubscripted}
              >
                {(form) => (
                  <Form>
                    <h6 className="py-0 m-0 text-secondary">
                      <b>faça sua parte</b>
                    </h6>
                    <InputText
                      type="email"
                      name="email"
                      value={form.values.email}
                      onChange={form.handleChange}
                      className="my-3 form-control"
                      placeholder="E-mail"
                      label="E-mail"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="submit"
                      className="w-100 btn btn-danger text-light"
                    >
                      {!isLoading ? 'Continuar'
                        : (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
        </div>

        <div className="card col-7 p-4">
          {isSubscripted
            ? <PaymentTab subscription={subscription} />
            : (
              <div>
                <h1 className="pb-4 text-danger text-center"><b>Seja um membro do clube de ofertas</b></h1>
                <h2 className="text-secondary text-center">
                  {'Frete '}
                  <b>Grátis</b>
                  {' para todo o Brasil'}
                </h2>
                <h2 className="text-secondary text-center">Descontos especiais em nossos produtos</h2>
              </div>
            )}
        </div>

      </Styles.Wrapper>

    </Styles.Club>
  );
}
