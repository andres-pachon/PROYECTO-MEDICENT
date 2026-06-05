import Header from "../components/header";
import Button from "../components/Button";
import Footer from "../components/Footer";

function ElegirRol() {
  return (
    <main>
      <Header />
      <section>
        <h2>Selecciona tu perfil</h2>
        <p>Para darte la mejor experiencia, dinos quién eres:</p>
        <div>
          <div>
            <h3>Paciente</h3>
            <p>Busco registrar mis datos médicos, tratamientos y conectar con un cuidador.</p>
            <Button texto="Soy Paciente" />
          </div>
          <div>
            <h3>Cuidador</h3>
            <p>Ofrezco mis servicios para atender a personas en tratamiento.</p>
            <Button texto="Soy Cuidador" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ElegirRol;