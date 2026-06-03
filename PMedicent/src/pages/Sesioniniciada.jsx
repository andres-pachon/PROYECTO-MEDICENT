import Header from "../components/Header";
import Footer from "../components/Footer";
function SesionIniciada() {
    return (
        <>
        <Header />
         <main>
    <div class="dashboard-bienvenida">
        <div class="bienvenida-izq">
            
            <img
                src="https://img.icons8.com/ios-filled/50/1d3b5e/user-male-circle.png"
                alt="Avatar usuario"
            />
            <span>Bienvenido, Rodrigo</span>
        </div>
        <div class="reloj" id="reloj">18:30</div>
    </div>


    <div class="proxima-toma" id="proxima-toma-section">
        <p class="etiqueta">Siguiente toma</p>
        <h1 class="nombre-medicamento" id="proxima-nombre">Cargando...</h1>
        <div class="dosis-info" id="proxima-info">
            <p id="proxima-dosis">--</p>
            <p id="proxima-hora">--</p>
            <p id="proxima-via">--</p>
        </div>
    </div>

    
    <div class="acciones-dashboard">
        <div class="acciones-grid">
            <button class="btn-accion" id="btn-registrar">Registrar Toma</button>
            <a href="registros-semana.html" class="btn-accion">Ver registros semana</a>
            <a href="tomar-biomarcadores.html" class="btn-accion">Tomar biomarcadores</a>
            <a href="mis-suministros.html" class="btn-accion">Mis suministros</a>
        </div>
    </div>

    
    <div class="mascota-chat">
        
        <img
            class="mascota"
            src="https://img.icons8.com/emoji/96/cat-emoji.png"
            alt="Mascota Medicent"
        />
        <div class="chat-btn-wrap">
            <span>¡Habla conmigo!</span>
            
            <img
                src="https://img.icons8.com/ios/60/1d3b5e/bot.png"
                alt="Chatbot"
            />
        </div>
    </div>

    <div class="separador"></div>


    <section class="seccion-medicamentos">
        <h2>Medicamentos hoy</h2>

        <div class="medicamento-item">
            <h3>Acetaminofen:</h3>
            <p>Via: Oral</p>
            <p>Dosis: 500 mg</p>
            <p class="estado-retrasado">DOSIS RETRASADA</p>
            <p class="nota-cuidador">Nota de Edgar Suarez: Suministre medicamento a las 9:00</p>
        </div>

        <div class="divider-med"></div>

        <div class="medicamento-item">
            <h3>Acetaminofen:</h3>
            <p>Dosis: 500 mg</p>
            <p class="estado-tomado">Tomado a las 13:00</p>
            <p>Via: Oral</p>
        </div>

        <div id="lista-tomas-nuevas"></div>
    </section>
    </main>
    <Footer />
        </>
    );
}
export default SesionIniciada;