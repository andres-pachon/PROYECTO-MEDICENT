import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PerfilCuidador() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="tarjeta-perfil">
            <h2>Mi Perfil de Cuidador</h2>
            <div className="foto-ficticia"></div>
            <p><strong>Nombre:</strong> Carlos Mendoza</p>
            <p><strong>Experiencia:</strong> 5 años en enfermería geriátrica</p>
            <p><strong>Teléfono:</strong> 315 987 6543</p>
            <p><strong>Estado:</strong> Disponible</p>
            <Link to="/editar-perfil">Editar Perfil</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PerfilCuidador