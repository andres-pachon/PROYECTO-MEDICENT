function Button({ texto, onClick, type = 'submit' }) {
  return (
    <button type={type} onClick={onClick}>
      {texto}
    </button>
  )
}

export default Button