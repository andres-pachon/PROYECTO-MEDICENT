import Header from '../components/Header';
import Footer from '../components/Footer';

function Inicio() {
  return (
    <>
    <Header />
    <main>
        <section id="home" className="home-section">
            <div className="container">
                <h1>MEDICENT</h1>
                <p>El lugar para cuidar de tu salud.<br />Recuerda que tu salud es primero  </p>
                <button className="btn">Comienza ahora</button>
            </div>
        </section>
        <section id="servicios" className="seccion-servicios">
            <div className="container">
                <h2>¿Que encontratas en Medicent?</h2>
                
                <div className="servicios">
                    <img src="https://img.icons8.com/ios/100/000000/medical-history.png" alt="Gestión de medicamentos" className="imagen-servicio" />
                    <h3>Gestion y control de tus medicamentos</h3>
                    <p>Solo necesitas la formula la cual será scaneada extrayendo datos como nombre, dosis, frecuencia, horario y duración del tratamiento.</p>
                </div>
                
                <div className="servicios">
                    <img src="https://img.icons8.com/ios/100/000000/heart-monitor.png" alt="Gestión de biomarcadores" className="imagen-servicio" />
                    <h3>Gestion de tus biomarcadores</h3>
                    <p>Registrar valores importantes de tu salud, como presión arterial, frecuencia cardíaca, nivel de glucosa, temperatura u otros indicadores.</p>
                </div>
                
                <div className="servicios"> 
                    <img src="https://img.icons8.com/ios/100/000000/warning-shield.png" alt="Validación de seguridad" className="imagen-servicio" />
                    <h3>Validación de seguridad</h3>
                    <p>Nuestras validaciones evitaran errores en dosis o en la combinaciones de medicamentos</p>
                </div>
            </div>
        </section>

         <section id="informacion" className="seccion-informacion">
        <div className="container">
            <div className="info-texto">
                <h2>Acceso compartido con cuidadores y familiares</h2>
                <p>Autorizar a un familiar o cuidador para que acceda a su información de medicación y seguimiento. De esta forma, podrán recibir notificaciones, verificar el cumplimiento del tratamiento y brindarle apoyo en caso de que olvide una dosis o surja alguna alerta.</p>
                <button className="btn-compartido">Comenzar acceso compartido</button>
            </div>
            
            <img
                src="https://img.icons8.com/ios/200/ffffff/like--v1.png"
                alt="Acceso compartido"
                className="imagen-corazon"
            />
        </div>
    </section>
    </main>
    <Footer />
    </>
  );
}
export default Inicio;