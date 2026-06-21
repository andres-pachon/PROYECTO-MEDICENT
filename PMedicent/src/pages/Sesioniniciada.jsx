import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import API from '../api';

function SesionIniciada() {
  const [horaActual, setHoraActual] = useState('');
  const [usuario, setUsuario] = useState({ nombre: 'Cargando...' });
  const [proximaToma, setProximaToma] = useState(null);
  const [tomasHoy, setTomasHoy] = useState([]);

  useEffect(() => {
    const actualizarReloj = () => {
      const ahora = new Date();
      const horas = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      setHoraActual(`${horas}:${minutos}`);
    };
    actualizarReloj();
    const interval = setInterval(actualizarReloj, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cargarDatosDashboard = async () => {
      try {
        const proxData = await API.getProximaToma();
        setProximaToma(proxData);
        
        const tomasData = await API.getTomasHoy(); // Mejor usar tomas de hoy
        setTomasHoy(tomasData);
        
        setUsuario({ nombre: 'Rodrigo López' });
      } catch (error) {
        console.error('Error al cargar los datos del dashboard:', error);
      }
    };
    cargarDatosDashboard();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="dashboard-bienvenida">
          <div className="bienvenida-izq">
            <img
              src="https://img.icons8.com/ios-filled/50/1d3b5e/user-male-circle.png"
              alt="Avatar usuario"
            />
            <span>Bienvenido, {usuario.nombre}</span>
          </div>
          <div className="reloj">{horaActual || '00:00'}</div>
        </div>

        {proximaToma ? (
          <div className="proxima-toma">
            <p className="etiqueta">Siguiente toma</p>
            <h1 className="nombre-medicamento">{proximaToma.medicamento}</h1>
            <div className="dosis-info">
              <p><strong>Dosis:</strong> {proximaToma.dosis}</p>
              <p><strong>Hora:</strong> {proximaToma.hora}</p>
              <p><strong>Vía:</strong> {proximaToma.via}</p>
            </div>
          </div>
        ) : (
          <div className="proxima-toma">
            <p>No tienes tomas pendientes registradas.</p>
          </div>
        )}

        {/* Acciones del Dashboard - Actualizado */}
        <div className="acciones-dashboard">
          <div className="acciones-grid">
            <Link to="/registrar-toma" className="btn-accion">
              Registrar Toma
            </Link>
            <Link to="/tratamiento" className="btn-accion">
              Ver Tratamiento
            </Link>
            <Link to="/tomar-biomarcadores" className="btn-accion">
              Biomarcadores
            </Link>
            <Link to="/editar-perfil" className="btn-accion">
              Editar Perfil
            </Link>
          </div>
        </div>

        <div className="mascota-chat">
          <img
            className="mascota"
            src="https://img.icons8.com/emoji/96/cat-emoji.png"
            alt="Mascota Medicent"
          />
          <div className="chat-btn-wrap">
            <span>¡Habla conmigo!</span>
            <img
              src="https://img.icons8.com/ios/60/1d3b5e/bot.png"
              alt="Chatbot"
            />
          </div>
        </div>

        <section className="seccion-medicamentos">
          <h2>Medicamentos hoy</h2>
          {tomasHoy.length === 0 ? (
            <p>No se han registrado tomas el día de hoy.</p>
          ) : (
            tomasHoy.map((toma) => (
              <div key={toma.id}>
                <div className="medicamento-item">
                  <h3>{toma.medicamento}:</h3>
                  <p><strong>Vía:</strong> {toma.via}</p>
                  <p><strong>Dosis:</strong> {toma.dosis}</p>
                  {toma.estado === 'retrasado' ? (
                    <p className="estado-retrasado">DOSIS RETRASADA (Programada: {toma.hora})</p>
                  ) : (
                    <p className="estado-tomado">Tomado a las {toma.hora}</p>
                  )}
                  {toma.nota && <p className="nota-cuidador">{toma.nota}</p>}
                </div>
                <div className="divider-med"></div>
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SesionIniciada;