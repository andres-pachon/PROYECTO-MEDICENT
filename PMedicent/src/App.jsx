import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from '../src/pages/Registro';
import InicioSesion from '../src/pages/InicioSesion';
import ElegirRol from '../src/pages/Elegir_rol';
import DatosPersonalesPaciente from '../src/pages/DatosPersonalesPaciente';
import DatosMedicosPaciente from '../src/pages/DatosMedicosPaciente';
import DatosPersonalesCuidador from '../src/pages/DatosPersonalesCuidador';
import PerfilCuidador from '../src/pages/PerfilCuidador';
import EditarPerfil from '../src/pages/EditarPerfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/elegir-rol" element={<ElegirRol />} />
        <Route path="/datos-personales-paciente" element={<DatosPersonalesPaciente />} />
        <Route path="/datos-medicos-paciente" element={<DatosMedicosPaciente />} />
        <Route path="/datos-personales-cuidador" element={<DatosPersonalesCuidador />} />
        <Route path="/perfil-cuidador" element={<PerfilCuidador />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;