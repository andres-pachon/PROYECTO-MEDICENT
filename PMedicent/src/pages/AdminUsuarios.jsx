import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import API from '../api'

function AdminUsuarios() {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(null) // id del usuario que se está editando
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    documento: '',
    password: ''
  })
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (!userData) {
      navigate('/inicio-sesion')
      return
    }
    const user = JSON.parse(userData)
    if (user.rol !== 'admin') {
      alert('No tienes permisos de administrador')
      navigate('/dashboard')
      return
    }
    cargarUsuarios()
  }, [navigate])

  const cargarUsuarios = async () => {
    try {
      setCargando(true)
      const data = await API.getAdminUsuarios()
      setUsuarios(data || [])
    } catch (error) {
      console.error(error)
      setMensaje('Error al cargar usuarios: ' + error.message)
    } finally {
      setCargando(false)
    }
  }

  const empezarEdicion = (usuario) => {
    setEditando(usuario.id)
    setForm({
      nombre: usuario.nombre || '',
      apellido: usuario.apellido || '',
      correo: usuario.correo || '',
      telefono: usuario.telefono || '',
      documento: usuario.documento || '',
      password: ''
    })
    setMensaje('')
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setForm({ nombre: '', apellido: '', correo: '', telefono: '', documento: '', password: '' })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const guardarCambios = async (id) => {
    try {
      const datos = { ...form }
      if (!datos.password) {
        delete datos.password // no enviar contraseña vacía
      }
      await API.actualizarUsuario(id, datos)
      setMensaje('Usuario actualizado correctamente')
      setEditando(null)
      cargarUsuarios()
    } catch (error) {
      setMensaje('Error al actualizar: ' + error.message)
    }
  }

  const eliminar = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que quieres eliminar al usuario "${nombre}"?`)) return

    try {
      await API.eliminarUsuario(id)
      setMensaje('Usuario eliminado correctamente')
      cargarUsuarios()
    } catch (error) {
      setMensaje('Error al eliminar: ' + error.message)
    }
  }

  return (
    <>
      <Header />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h1>Gestión de Usuarios</h1>
          <Link to="/admin" style={{ color: '#1d3b5e', textDecoration: 'none', fontWeight: '500' }}>
            ← Volver al Panel
          </Link>
        </div>

        {mensaje && (
          <div style={{
            padding: '12px',
            marginBottom: '20px',
            background: mensaje.includes('Error') ? '#f8d7da' : '#d4edda',
            color: mensaje.includes('Error') ? '#721c24' : '#155724',
            borderRadius: '6px'
          }}>
            {mensaje}
          </div>
        )}

        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: '#1d3b5e', color: 'white' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nombre</th>
                  <th style={thStyle}>Apellido</th>
                  <th style={thStyle}>Correo</th>
                  <th style={thStyle}>Teléfono</th>
                  <th style={thStyle}>Documento</th>
                  <th style={thStyle}>Rol</th>
                  <th style={thStyle}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    {editando === u.id ? (
                      <>
                        <td style={tdStyle}>{u.id}</td>
                        <td style={tdStyle}>
                          <input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="apellido" value={form.apellido} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="correo" value={form.correo} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="telefono" value={form.telefono} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="documento" value={form.documento} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>{u.rol}</td>
                        <td style={tdStyle}>
                          <button onClick={() => guardarCambios(u.id)} style={btnGuardar}>Guardar</button>
                          <button onClick={cancelarEdicion} style={btnCancelar}>Cancelar</button>
                          <div style={{ marginTop: '6px' }}>
                            <input
                              name="password"
                              type="password"
                              placeholder="Nueva contraseña (opcional)"
                              value={form.password}
                              onChange={handleChange}
                              style={{ ...inputStyle, width: '140px' }}
                            />
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tdStyle}>{u.id}</td>
                        <td style={tdStyle}>{u.nombre}</td>
                        <td style={tdStyle}>{u.apellido}</td>
                        <td style={tdStyle}>{u.correo}</td>
                        <td style={tdStyle}>{u.telefono || '-'}</td>
                        <td style={tdStyle}>{u.documento}</td>
                        <td style={tdStyle}>
                          <span style={{
                            background: u.rol === 'admin' ? '#e74c3c' : '#27ae60',
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.85rem'
                          }}>
                            {u.rol}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <button onClick={() => empezarEdicion(u)} style={btnEditar}>Editar</button>
                          <button onClick={() => eliminar(u.id, u.nombre)} style={btnEliminar}>Eliminar</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

// Estilos
const thStyle = { padding: '12px 10px', textAlign: 'left' }
const tdStyle = { padding: '10px', verticalAlign: 'middle' }
const inputStyle = { padding: '6px 8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }
const btnEditar = { background: '#2980b9', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', marginRight: '6px', cursor: 'pointer' }
const btnEliminar = { background: '#c0392b', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }
const btnGuardar = { background: '#27ae60', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', marginRight: '6px', cursor: 'pointer' }
const btnCancelar = { background: '#7f8c8d', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }

export default AdminUsuarios