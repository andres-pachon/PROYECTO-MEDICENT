import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'
import API from '../api'

function Registro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '', apellido: '', correo: '', contrasena: '', confirmar: ''
  })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.contrasena !== form.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    if (form.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setCargando(true)
    try {
      // Verificar si el correo ya existe
      const existentes = await API.getUsuarioPorEmail(form.correo)
      if (existentes.length > 0) {
        setError('Ya existe una cuenta con ese correo.')
        setCargando(false)
        return
      }

      // Crear el usuario en la API
      await API.crearUsuario({
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        email: form.correo,
        avatar: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png'
      })

      navigate('/elegir-rol')
    } catch (err) {
      console.error('Error al registrar:', err)
      setError('Hubo un error al registrar. Verifica que json-server esté corriendo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <TarjetaFormulario titulo="Registrarse" onSubmit={handleSubmit}>
      <CampoTexto label="Nombre" id="nombre" placeholder="Ingrese su nombre" required value={form.nombre} onChange={handleChange} />
      <CampoTexto label="Apellido" id="apellido" placeholder="Ingrese su apellido" required value={form.apellido} onChange={handleChange} />
      <CampoTexto label="Correo" id="correo" type="email" placeholder="Ingrese su correo" required value={form.correo} onChange={handleChange} />
      <CampoTexto label="Contraseña" id="contrasena" type="password" placeholder="Mínimo 6 caracteres" required value={form.contrasena} onChange={handleChange} />
      <CampoTexto label="Confirmar Contraseña" id="confirmar" type="password" placeholder="Repita la contraseña" required value={form.confirmar} onChange={handleChange} />
      {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{error}</p>}
      <Button texto={cargando ? 'Registrando...' : 'Confirmar'} />
      <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion">Inicia sesión</Link></p>
    </TarjetaFormulario>
  )
}

export default Registro