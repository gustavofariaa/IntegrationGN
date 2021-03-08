import InputText from '../../../InputText';

export default function CustomerForm({ form, isLoading }) {
  return (
    <>
      <h6 className="py-0 m-0 col-12 mt-4 text-secondary">
        <b>Dados pessoais</b>
      </h6>

      <div className="col-8">
        <InputText
          type="text"
          name="customer.name"
          value={form.values.customer.name}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Nome completo"
          label="Nome completo"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-4">
        <InputText
          type="date"
          name="customer.birth"
          value={form.values.customer.birth}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Nascimento"
          label="Nascimento"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-4">
        <InputText
          type="text"
          name="customer.cpf"
          value={form.values.customer.cpf}
          onChange={form.handleChange}
          className="form-control"
          placeholder="CPF"
          label="CPF"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-5">
        <InputText
          type="email"
          name="customer.email"
          value={form.values.customer.email}
          onChange={form.handleChange}
          className="form-control"
          placeholder="E-mail"
          label="E-mail"
          disabled={isLoading}
          required
        />
      </div>

      <div className="col-3">
        <InputText
          type="text"
          name="customer.phone_number"
          value={form.values.customer.phone_number}
          onChange={form.handleChange}
          className="form-control"
          placeholder="Telefone"
          label="Telefone"
          disabled={isLoading}
          required
        />
      </div>

    </>
  );
}
