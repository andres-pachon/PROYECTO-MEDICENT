import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'

function DatosPersonalesPaciente() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ telefono: '', edad: '', contacto_emergencia: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/datos-medicos-paciente')
  }

  return (
    <TarjetaFormulario titulo="Datos Personales del Paciente" onSubmit={handleSubmit}>
      <CampoTexto label="Teléfono de Contacto" id="telefono" type="tel" placeholder="Ej: 3101234567" required value={form.telefono} onChange={handleChange} />
      <CampoTexto label="Edad" id="edad" type="number" placeholder="Ej: 45" required value={form.edad} onChange={handleChange} />
      <CampoTexto label="Contacto de Emergencia" id="contacto_emergencia" placeholder="Ej: María Pérez" required value={form.contacto_emergencia} onChange={handleChange} />
      <Button texto="Siguiente: Datos Médicos" />
    </TarjetaFormulario>
  )
}

export default DatosPersonalesPaciente