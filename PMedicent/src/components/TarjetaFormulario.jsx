function FormCard({ titulo, children }) {
  return (
    <>
    <main>
      <section>
        <form>
          <h2>{titulo}</h2>
          {children}
        </form>
      </section>
    </main>
    </>
  );
  
}

export default FormCard;