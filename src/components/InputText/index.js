export default function InputText({ label = '', ...rest }) {
  return (
    <div className="form-floating">
      <input {...rest} />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
}
