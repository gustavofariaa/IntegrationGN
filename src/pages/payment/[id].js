import PaymentPage from '../../components/pages/Payment';

import api from '../../utils/api';

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  try {
    const { data } = await api.get(`/api/payment/${id}`);
    return { props: { payment: data } };
  } catch (error) {
    return { props: { payment: null } };
  }
}

export default function Payment({ payment }) {
  return <PaymentPage payment={payment} />;
}
