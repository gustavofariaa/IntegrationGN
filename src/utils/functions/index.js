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
  const script = document.createElement('script');
  script.type = 'text/javascript';
  // eslint-disable-next-line radix
  const validation = parseInt(Math.random() * 1000000);
  script.src = `https://sandbox.gerencianet.com.br/v1/cdn/9f5a8c2bc2a09a6a985c784480a082c1/${validation}`;
  script.async = false;
  script.id = '9f5a8c2bc2a09a6a985c784480a082c1';
  if (!document.getElementById('9f5a8c2bc2a09a6a985c784480a082c1')) {
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  window.$gn = {
    validForm: true,
    processed: false,
    done: {},
    ready(fn) { window.$gn.done = fn; },
  };
  window.$gn.ready(async (checkout) => {
    await checkout.getPaymentToken({
      brand: card.brand,
      number: card.number,
      cvv: card.cvv,
      expiration_month: card.expiration_month,
      expiration_year: card.expiration_year,
    }, callback);
    window.$gn = null;
  });
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
