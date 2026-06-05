import Button from "../components/Button";
import CampoTexto from "../components/CampoTexto";
import TarjetaFormulario from "../components/TarjetaFormulario";

function DatosMedicosPaciente() {
  return (
    
    <TarjetaFormulario titulo="Datos Médicos del Paciente">
      <CampoTexto label="EPS / Entidad de Salud" id="eps" placeholder="Ej: Sanitas" required />
      <CampoTexto label="Alergias Conocidas" id="alergias" placeholder="Ej: Ninguna, Penicilina..." required />
      <CampoTexto label="Diagnóstico o Condición Principal" id="diagnostico" placeholder="Ej: Diabetes Tipo 2" required />
      <Button texto="Finalizar Registro" />
    </TarjetaFormulario>
  );
}

export default DatosMedicosPaciente;