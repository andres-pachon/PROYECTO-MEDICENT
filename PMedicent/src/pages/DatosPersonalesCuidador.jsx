import Button from "../components/Button";
import CampoTexto from "../components/CampoTexto";
import TarjetaFormulario from "../components/TarjetaFormulario";

function DatosPersonalesCuidador() {
  return (
    <TarjetaFormulario titulo="Datos Profesionales del Cuidador">
      <CampoTexto label="Documento de Identidad" id="identificacion" placeholder="Número de cédula" required />
      <CampoTexto label="Años de Experiencia" id="experiencia" type="number" placeholder="Ej: 3" required />
      <CampoTexto label="Teléfono Celular" id="telefono_cuidador" type="tel" placeholder="Número de contacto" required />
      <Button texto="Crear Perfil de Cuidador" />
    </TarjetaFormulario>
  );
}

export default DatosPersonalesCuidador;