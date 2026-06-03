import Button from "../components/Button";
import CampoTexto from "../components/CampoTexto";
import TarjetaFormulario from "../components/TarjetaFormulario";

function EditarPerfil() {
  return (
    <TarjetaFormulario titulo="Editar mi Perfil">
      <CampoTexto label="Actualizar Teléfono" id="nuevo_telefono" type="tel" placeholder="315 987 6543" />
      <Button texto="Guardar Cambios" />
    </TarjetaFormulario>
  );
}

export default EditarPerfil;