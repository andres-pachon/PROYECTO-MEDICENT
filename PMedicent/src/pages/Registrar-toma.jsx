import Header from "../components/Header";
import Footer from "../components/Footer";

function RegistrarToma() {
  return (
    <>
      <Header />
      <main>
        <div className="registrar-toma-page">

          <div className="reloj-top" id="reloj">18:30</div>
          <h2>Registrar Toma</h2>

          <div className="form-toma">

            <div className="campo-grupo" style={{ marginBottom: '16px' }}>
              <label htmlFor="medicamento">Medicamento</label>
              <select id="medicamento" required>
                <option value="">Seleccionar medicamento...</option>
                <option value="Acetaminofen">Acetaminofen</option>
                <option value="Metotrexato">Metotrexato</option>
                <option value="Ibuprofeno">Ibuprofeno</option>
                <option value="Omeprazol">Omeprazol</option>
                <option value="Losartan">Losartan</option>
                <option value="Amlodipino">Amlodipino</option>
              </select>
            </div>

            <div className="campo-grupo" style={{ marginBottom: '16px' }}>
              <label htmlFor="dosis">
                Dosis <span style={{ color: '#ef4444', fontSize: '13px' }}>*</span>
              </label>
              <input type="text" id="dosis" placeholder="Ej: 500 mg, 1.5 ml, 2 tabletas" required />
            </div>

            <div className="form-toma-grid">
              <div className="campo-grupo">
                <label htmlFor="hora">Hora de toma</label>
                <input type="time" id="hora" required />
              </div>

              <div className="campo-grupo">
                <label htmlFor="nota">Nota (opcional)</label>
                <textarea id="nota" placeholder="Escribe una nota opcional..." />
              </div>
            </div>

            <button className="btn-confirmar" id="btn-confirmar">
              Confirmar Toma
            </button>

            <div className="mensaje-exito" id="mensaje-exito">
              ✅ ¡Toma registrada correctamente! Redirigiendo...
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default RegistrarToma;