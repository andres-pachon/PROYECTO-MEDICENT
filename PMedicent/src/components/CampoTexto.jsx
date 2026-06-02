function InputField({ label, id, type = "text", placeholder, required }) {
  return (
    <>
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
    </>
  );
}

export default InputField;