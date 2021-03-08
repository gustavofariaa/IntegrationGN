import InputText from '../../../InputText';

import { getAddress } from '../../../../utils/functions';

export default function AddressForm({ form, isLoading, setIsLoading }) {
  const handleSetAddress = async (zipcode) => {
    setIsLoading(true);
    form.setFieldValue('billing_address.zipcode', zipcode);
    const cep = String(zipcode.replace(/\D/g, ''));
    if (cep?.length === 8) {
      const { data } = await getAddress(cep);
      form.setFieldValue('billing_address.street', data?.logradouro);
      form.setFieldValue('billing_address.neighborhood', data?.bairro);
      form.setFieldValue('billing_address.city', data?.localidade);
      form.setFieldValue('billing_address.state', data?.uf);
    } else {
      form.setFieldValue('billing_address.street', '');
      form.setFieldValue('billing_address.neighborhood', '');
      form.setFieldValue('billing_address.city', '');
      form.setFieldValue('billing_address.state', '');
    }
    setIsLoading(false);
  };

  return (
    <>
      <h6 className="py-0 m-0 col-12 mt-4 text-secondary">
        <b>Endereço da cobrança</b>
      </h6>

      <div className="col-3">
        <InputText
          type="text"
          name="billing_address.zipcode"
          value={form.values.billing_address.zipcode}
          onChange={({ target: { value } }) => handleSetAddress(value)}
          className="form-control"
          placeholder="CEP"
          label="CEP"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-2">
        <InputText
          type="text"
          name="billing_address.state"
          value={form.values.billing_address.state}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Estado"
          label="Estado"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-4">
        <InputText
          type="text"
          name="billing_address.city"
          value={form.values.billing_address.city}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Cidade"
          label="Cidade"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-3">
        <InputText
          type="text"
          name="billing_address.neighborhood"
          value={form.values.billing_address.neighborhood}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Bairro"
          label="Bairro"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-6">
        <InputText
          type="text"
          name="billing_address.street"
          value={form.values.billing_address.street}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Endereço"
          label="Endereço"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-2">
        <InputText
          type="text"
          name="billing_address.number"
          value={form.values.billing_address.number}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Número"
          label="Número"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-4">
        <InputText
          type="text"
          name="billing_address.complement"
          value={form.values.billing_address.complement}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Complemento"
          label="Complemento"
          disabled={isLoading}
        />
      </div>
    </>
  );
}
