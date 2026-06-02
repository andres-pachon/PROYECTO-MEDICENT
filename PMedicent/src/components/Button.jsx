function Button({ texto, onClick }) {
  return (
    <>
    <button type="submit" onClick={onClick}>
      {texto}
    </button>

    </>
  );
  
}

export default Button;