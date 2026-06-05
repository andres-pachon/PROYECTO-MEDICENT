import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'

function DatosMedicosPaciente() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ eps: '', alergias: '', diagnostico: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <TarjetaFormulario titulo="Datos Médicos del Paciente" onSubmit={handleSubmit}>
      <CampoTexto label="EPS / Entidad de Salud" id="eps" placeholder="Ej: Sanitas" required value={form.eps} onChange={handleChange} />
      <CampoTexto label="Alergias Conocidas" id="alergias" placeholder="Ej: Ninguna, Penicilina..." required value={form.alergias} onChange={handleChange} />
      <CampoTexto label="Diagnóstico o Condición Principal" id="diagnostico" placeholder="Ej: Diabetes Tipo 2" required value={form.diagnostico} onChange={handleChange} />
      <Button texto="Finalizar Registro" />
    </TarjetaFormulario>
  )
}

export default DatosMedicosPaciente