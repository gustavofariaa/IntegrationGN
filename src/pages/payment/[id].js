import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PaymentPage from '../../components/pages/Payment';

import api from '../../utils/api';

export default function Payment() {
  const { query: { id } } = useRouter();

  const [payment, setPayment] = useState(undefined)

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await api.get(`/api/payment/${id}`);
        setPayment(data)
      } catch(error) { 
        console.error(error);
        setPayment(null);
      }
    })()
  }, [id])

  return <PaymentPage payment={payment} />;
}
