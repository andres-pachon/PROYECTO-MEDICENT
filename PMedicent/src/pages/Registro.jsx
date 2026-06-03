import Header from "../components/header";
import Button from "../components/Button";
import CampoTexto from "../components/CampoTexto";
import TarjetaFormulario from "../components/TarjetaFormulario";
import Footer from "../components/Footer";

function Registro() {
  return (
    <TarjetaFormulario titulo="Registrarse">
      <CampoTexto label="Nombre" id="nombre" placeholder="Ingrese su nombre" required />
      <CampoTexto label="Apellido" id="apellido" placeholder="Ingrese su apellido" required />
      <CampoTexto label="Correo" id="correo" type="email" placeholder="Ingrese su correo" required />
      <CampoTexto label="Contraseña" id="contrasena" type="password" placeholder="Ingrese la contraseña" required />
      <CampoTexto label="Confirmar Contraseña" id="confirmar" type="password" placeholder="Repita la contraseña" required />
      <Button texto="Confirmar" />
      <p>¿Ya tienes una cuenta? <a href="/inicio-sesion">Inicia sesión</a></p>
    </TarjetaFormulario>
  );
}

export default Registro;