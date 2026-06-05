import Button from "../components/Button";
import CampoTexto from "../components/CampoTexto";
import TarjetaFormulario from "../components/TarjetaFormulario";

function DatosPersonalesPaciente() {
  return (
    <TarjetaFormulario titulo="Datos Personales del Paciente">
      <CampoTexto label="Teléfono de Contacto" id="telefono" type="tel" placeholder="Ej: 3101234567" required />
      <CampoTexto label="Edad" id="edad" type="number" placeholder="Ej: 45" required />
      <CampoTexto label="Contacto de Emergencia" id="contacto_emergencia" placeholder="Ej: María Pérez" required />
      <Button texto="Siguiente: Datos Médicos" />
    </TarjetaFormulario>
  );
}

export default DatosPersonalesPaciente;