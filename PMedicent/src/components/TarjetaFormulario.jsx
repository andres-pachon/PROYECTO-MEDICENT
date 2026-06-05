import Header from './Header'
import Footer from './Footer'

function TarjetaFormulario({ titulo, children, onSubmit }) {
  return (
    <div className="pagina-formulario">
      <Header />
      <main>
        <section>
          <form onSubmit={onSubmit}>
            <h2>{titulo}</h2>
            {children}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default TarjetaFormulario