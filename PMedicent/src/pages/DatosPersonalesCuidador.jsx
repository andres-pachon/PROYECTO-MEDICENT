import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'

function DatosPersonalesCuidador() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ identificacion: '', experiencia: '', telefono_cuidador: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/perfil-cuidador')
  }

  return (
    <TarjetaFormulario titulo="Datos Profesionales del Cuidador" onSubmit={handleSubmit}>
      <CampoTexto label="Documento de Identidad" id="identificacion" placeholder="Número de cédula" required value={form.identificacion} onChange={handleChange} />
      <CampoTexto label="Años de Experiencia" id="experiencia" type="number" placeholder="Ej: 3" required value={form.experiencia} onChange={handleChange} />
      <CampoTexto label="Teléfono Celular" id="telefono_cuidador" type="tel" placeholder="Número de contacto" required value={form.telefono_cuidador} onChange={handleChange} />
      <Button texto="Crear Perfil de Cuidador" />
    </TarjetaFormulario>
  )
}

export default DatosPersonalesCuidador