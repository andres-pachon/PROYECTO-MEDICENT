import Header from "../components/header";
import Button from "../components/Button";
import Footer from "../components/Footer";

function PerfilCuidador() {
  return (
    <main>
      <Header />
      <section>
        <h2>Mi Perfil de Cuidador</h2>
        <div style={{ width: 100, height: 100, background: '#ccc', borderRadius: '50%' }}></div>
        <p><strong>Nombre:</strong> Carlos Mendoza</p>
        <p><strong>Experiencia:</strong> 5 años en enfermería geriátrica</p>
        <p><strong>Teléfono:</strong> 315 987 6543</p>
        <p><strong>Estado:</strong> Disponible</p>
        <a href="/editar-perfil">Editar Perfil</a>
      </section>
      <Footer />
    </main>
  );
}

export default PerfilCuidador;