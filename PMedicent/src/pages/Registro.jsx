import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TarjetaFormulario from '../components/TarjetaFormulario'
import CampoTexto from '../components/CampoTexto'
import Button from '../components/Button'
import API from '../api'

function Registro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '', 
    apellido: '', 
    idTipoDocumento: '1', // Por defecto 1 (Cédula de Ciudadanía)
    documento: '',
    fechaNacimiento: '',
    correo: '', 
    contrasena: '', 
    confirmar: ''
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
      // Ahora enviamos los datos reales capturados del formulario
      await API.crearUsuario({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        password: form.contrasena, 
        idTipoDocumento: parseInt(form.idTipoDocumento), // Lo convertimos a número para Flask
        documento: form.documento,
        fechaNacimiento: form.fechaNacimiento // El input 'date' ya viene en formato YYYY-MM-DD
      })

      navigate('/elegir-rol')
    } catch (err) {
      console.error('Error al registrar:', err)
      setError(err.message || 'Hubo un error al registrar en el servidor.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <TarjetaFormulario titulo="Registrarse" onSubmit={handleSubmit}>
      <CampoTexto label="Nombre" id="nombre" placeholder="Ingrese su nombre" required value={form.nombre} onChange={handleChange} />
      <CampoTexto label="Apellido" id="apellido" placeholder="Ingrese su apellido" required value={form.apellido} onChange={handleChange} />
      
      {/* Nuevo campo: Tipo de Documento */}
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="idTipoDocumento" style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>TIPO DE DOCUMENTO</label>
        <select 
          id="idTipoDocumento" 
          value={form.idTipoDocumento} 
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        >
          <option value="1">Cédula de Ciudadanía</option>
          <option value="2">Tarjeta de Identidad</option>
          <option value="3">Cédula de Extranjería</option>
        </select>
      </div>

      {/* Nuevo campo: Documento */}
      <CampoTexto label="Número de Documento" id="documento" placeholder="Ingrese su documento" required value={form.documento} onChange={handleChange} />
      
      {/* Nuevo campo: Fecha de Nacimiento */}
      <CampoTexto label="Fecha de Nacimiento" id="fechaNacimiento" type="date" required value={form.fechaNacimiento} onChange={handleChange} />

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