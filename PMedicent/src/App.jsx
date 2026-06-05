import { Routes, Route } from 'react-router-dom'
import './styles/estilos.css'
import Inicio from './pages/Inicio'
import SesionIniciada from './pages/Sesioniniciada'
import RegistrarToma from './pages/Registrar-toma'
import Registro from './pages/Registro'
import InicioSesion from './pages/InicioSesion'
import ElegirRol from './pages/Elegir_rol'
import DatosPersonalesPaciente from './pages/DatosPersonalesPaciente'
import DatosMedicosPaciente from './pages/DatosMedicosPaciente'
import DatosPersonalesCuidador from './pages/DatosPersonalesCuidador'
import PerfilCuidador from './pages/PerfilCuidador'
import EditarPerfil from './pages/EditarPerfil'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/dashboard" element={<SesionIniciada />} />
      <Route path="/registrar-toma" element={<RegistrarToma />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicio-sesion" element={<InicioSesion />} />
      <Route path="/elegir-rol" element={<ElegirRol />} />
      <Route path="/datos-personales-paciente" element={<DatosPersonalesPaciente />} />
      <Route path="/datos-medicos-paciente" element={<DatosMedicosPaciente />} />
      <Route path="/datos-personales-cuidador" element={<DatosPersonalesCuidador />} />
      <Route path="/perfil-cuidador" element={<PerfilCuidador />} />
      <Route path="/editar-perfil" element={<EditarPerfil />} />
    </Routes>
  )
}

export default App