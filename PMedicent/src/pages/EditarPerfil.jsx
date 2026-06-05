import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'

function EditarPerfil() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nuevo_telefono: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/perfil-cuidador')
  }

  return (
    <TarjetaFormulario titulo="Editar mi Perfil" onSubmit={handleSubmit}>
      <CampoTexto label="Actualizar Teléfono" id="nuevo_telefono" type="tel" placeholder="315 987 6543" value={form.nuevo_telefono} onChange={handleChange} />
      <Button texto="Guardar Cambios" />
    </TarjetaFormulario>
  )
}

export default EditarPerfil