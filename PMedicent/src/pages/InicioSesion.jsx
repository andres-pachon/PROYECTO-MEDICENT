import Header from "../components/header";
import Button from "../components/Button";
import CampoTexto from "../components/CampoTexto";
import TarjetaFormulario from "../components/TarjetaFormulario";
import Footer from "../components/Footer";

function InicioSesion() {
  return (
    <TarjetaFormulario titulo="Inicio de Sesión">
      <CampoTexto label="Correo" id="correo" type="email" placeholder="ejemplo@gmail.com" required />
      <CampoTexto label="Contraseña" id="contrasena" type="password" placeholder="Ingrese la contraseña" required />
      <a href="#">¿Olvidaste tu contraseña?</a>
      <Button texto="Ingresar" />
      <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
    </TarjetaFormulario>
  );
}

export default InicioSesion;