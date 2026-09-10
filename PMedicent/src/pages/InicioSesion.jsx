import { useState } from 'react'
import { Link } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'
import API from '../api'

function InicioSesion() {
  const [form, setForm] = useState({ correo: '', contrasena: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const respuesta = await API.login(form.correo, form.contrasena)
      console.log('Login exitoso:', respuesta)

      localStorage.setItem('token', respuesta.accessToken)
      localStorage.setItem('usuario', JSON.stringify(respuesta.user))

      // Redirección según el rol
      if (respuesta.user.rol === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error('Error en el inicio de sesión:', err)
      setError(err.message || 'Correo o contraseña incorrectos.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <TarjetaFormulario titulo="Inicio de Sesión" onSubmit={handleSubmit}>
      <CampoTexto label="Correo" id="correo" type="email" placeholder="ejemplo@gmail.com" required value={form.correo} onChange={handleChange} />
      <CampoTexto label="Contraseña" id="contrasena" type="password" placeholder="Ingrese la contraseña" required value={form.contrasena} onChange={handleChange} />
      <a href="#">¿Olvidaste tu contraseña?</a>
      {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{error}</p>}
      <Button texto={cargando ? 'Ingresando...' : 'Ingresar'} />
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </TarjetaFormulario>
  )
}

export default InicioSesion