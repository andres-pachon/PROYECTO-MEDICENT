import { useState } from 'react'
import { Brouser, Routes, Route } from 'react-router-dom'
import './styles/estilos.css'
import Inicio from './pages/Inicio'
import SesionIniciada from './pages/sesioniniciada'
import RegistrarToma from './pages/Registrar-toma'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/dashboard" element={<SesionIniciada />} />
      <Route path="/registrar-toma" element={<RegistrarToma />} />
    </Routes>
  )
}

export default App