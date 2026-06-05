import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function ElegirRol() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <main>
        <section id="seleccion-rol">
          <div className="contenedor-roles">
            <h2>Selecciona tu perfil</h2>
            <p className="subtitulo">Para darte la mejor experiencia, dinos quién eres:</p>
            <div className="opciones-roles">
              <div className="tarjeta-rol">
                <h3>Paciente</h3>
                <p>Busco registrar mis datos médicos, tratamientos y conectar con un cuidador.</p>
                <button className="btn-primario" onClick={() => navigate('/datos-personales-paciente')}>
                  Soy Paciente
                </button>
              </div>
              <div className="tarjeta-rol">
                <h3>Cuidador</h3>
                <p>Ofrezco mis servicios para atender a personas en tratamiento.</p>
                <button className="btn-primario" onClick={() => navigate('/datos-personales-cuidador')}>
                  Soy Cuidador
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ElegirRol