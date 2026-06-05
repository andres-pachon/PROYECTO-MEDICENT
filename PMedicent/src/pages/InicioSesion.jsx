import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'

function InicioSesion() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ correo: '', contrasena: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la validación real contra la API
    navigate('/dashboard')
  }

  return (
    <TarjetaFormulario titulo="Inicio de Sesión" onSubmit={handleSubmit}>
      <CampoTexto label="Correo" id="correo" type="email" placeholder="ejemplo@gmail.com" required value={form.correo} onChange={handleChange} />
      <CampoTexto label="Contraseña" id="contrasena" type="password" placeholder="Ingrese la contraseña" required value={form.contrasena} onChange={handleChange} />
      <a href="#">¿Olvidaste tu contraseña?</a>
      <Button texto="Ingresar" />
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </TarjetaFormulario>
  )
}

export default InicioSesion