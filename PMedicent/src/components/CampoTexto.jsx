function CampoTexto({ label, id, type = 'text', placeholder, required, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default CampoTexto