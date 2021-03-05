import InputText from '../../../../../InputText';

import { getCardFlag } from '../../../../../../utils/functions';

export default function CardForm({ form, isLoading }) {
  const handleSetCardBrand = (number) => {
    form.setFieldValue('card.number', number);
    const brand = getCardFlag(number);
    if (brand) form.setFieldValue('card.brand', brand);
  };

  return (
    <>
      <h6 className="py-0 m-0 col-12 mt-3 text-secondary">
        <b>Dados do cartão</b>
      </h6>

      <div className="col-12">
        <InputText
          type="text"
          name="card.number"
          value={form.values.card.number}
          onChange={({ target: { value } }) => handleSetCardBrand(value, form)}
          className="form-control"
          placeholder="Número do cartão"
          label="Número do cartão"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-6">
        <InputText
          type="text"
          name="card.brand"
          value={form.values.card.brand}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Bandeira"
          label="Bandeira"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-2">
        <InputText
          type="text"
          name="card.cvv"
          value={form.values.card.cvv}
          onChange={form.handleChange}
          className="form-control"
          placeholder="CVV"
          label="CVV"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-2">
        <InputText
          type="text"
          name="card.expiration_month"
          value={form.values.card.expiration_month}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Mês"
          label="Mês"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-2">
        <InputText
          type="text"
          name="card.expiration_year"
          value={form.values.card.expiration_year}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Ano"
          label="Ano"
          disabled={isLoading}
          required
        />
      </div>
    </>
  );
}
