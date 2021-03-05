import axios from 'axios';

export const formatBRL = (value) => {
  const convertedValue = (value / 100)
    .toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

  return convertedValue;
};

export const calcTotalItems = (items) => {
  if (items.length <= 0) return 0;
  const { value } = items?.reduce?.((accumulator, item) => (
    { value: accumulator.value + item.value }
  ));
  return value;
};

export const calcShipping = () => 0;

export const getAddress = async (CEP) => {
  const cep = String(CEP.replace(/\D/g, ''));
  const baseURL = 'https://viacep.com.br/ws';
  const api = axios.create({ baseURL });
  const address = await api.get(`/${cep}/json/`);
  return address;
};

export const shuffleItems = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
};

export const getPaymentToken = async (card, callback) => {
  await window.checkout.getPaymentToken({
    brand: 'visa', // bandeira do cartão
    number: '4012001038443335', // número do cartão
    cvv: '123', // código de segurança
    expiration_month: '05', // mês de vencimento
    expiration_year: '2021', // ano de vencimento
  }, callback);
};

export const getCardFlag = (cardNumber) => {
  const number = cardNumber.replace(/[^0-9]+/g, '');

  const flags = {
    visa: /^4[0-9]{12}(?:[0-9]{3})/,
    mastercard: /^5[1-5][0-9]{14}/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    amex: /^3[47][0-9]{13}/,
    hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
    elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
  };

  const brand = Object.keys(flags)?.find((flag) => flags[flag].test(number));

  if (brand) return brand;
  return false;
};
