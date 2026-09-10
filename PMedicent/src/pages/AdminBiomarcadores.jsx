import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import API from '../api'

function AdminBiomarcadores() {
  const navigate = useNavigate()
  const [biomarcadores, setBiomarcadores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    tipo: '',
    nombre: '',
    valor: '',
    unidad: '',
    estado: '',
    notas: '',
    fecha: '',
    hora: ''
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
    cargarBiomarcadores()
  }, [navigate])

  const cargarBiomarcadores = async () => {
    try {
      setCargando(true)
      const data = await API.getAdminBiomarcadores()
      setBiomarcadores(data || [])
    } catch (error) {
      console.error(error)
      setMensaje('Error al cargar biomarcadores: ' + error.message)
    } finally {
      setCargando(false)
    }
  }

  const empezarEdicion = (b) => {
    setEditando(b.id)
    setForm({
      tipo: b.tipo || '',
      nombre: b.nombre || '',
      valor: b.valor || '',
      unidad: b.unidad || '',
      estado: b.estado || '',
      notas: b.notas || '',
      fecha: b.fecha || '',
      hora: b.hora ? b.hora.substring(0, 5) : ''
    })
    setMensaje('')
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setForm({ tipo: '', nombre: '', valor: '', unidad: '', estado: '', notas: '', fecha: '', hora: '' })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const guardarCambios = async (id) => {
    try {
      await API.actualizarBiomarcador(id, form)
      setMensaje('Biomarcador actualizado correctamente')
      setEditando(null)
      cargarBiomarcadores()
    } catch (error) {
      setMensaje('Error al actualizar: ' + error.message)
    }
  }

  const eliminar = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que quieres eliminar el biomarcador "${nombre}"?`)) return

    try {
      await API.eliminarBiomarcador(id)
      setMensaje('Biomarcador eliminado correctamente')
      cargarBiomarcadores()
    } catch (error) {
      setMensaje('Error al eliminar: ' + error.message)
    }
  }

  return (
    <>
      <Header />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h1>Gestión de Biomarcadores</h1>
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
          <p>Cargando biomarcadores...</p>
        ) : biomarcadores.length === 0 ? (
          <p>No hay biomarcadores registrados.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: '#1d3b5e', color: 'white' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Tipo</th>
                  <th style={thStyle}>Nombre</th>
                  <th style={thStyle}>Valor</th>
                  <th style={thStyle}>Unidad</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>Fecha</th>
                  <th style={thStyle}>Hora</th>
                  <th style={thStyle}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {biomarcadores.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    {editando === b.id ? (
                      <>
                        <td style={tdStyle}>{b.id}</td>
                        <td style={tdStyle}><input name="tipo" value={form.tipo} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}><input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}><input name="valor" type="number" value={form.valor} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}><input name="unidad" value={form.unidad} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}><input name="estado" value={form.estado} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}><input name="fecha" type="date" value={form.fecha} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}><input name="hora" type="time" value={form.hora} onChange={handleChange} style={inputStyle} /></td>
                        <td style={tdStyle}>
                          <button onClick={() => guardarCambios(b.id)} style={btnGuardar}>Guardar</button>
                          <button onClick={cancelarEdicion} style={btnCancelar}>Cancelar</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tdStyle}>{b.id}</td>
                        <td style={tdStyle}>{b.tipo}</td>
                        <td style={tdStyle}>{b.nombre}</td>
                        <td style={tdStyle}>{b.valor}</td>
                        <td style={tdStyle}>{b.unidad}</td>
                        <td style={tdStyle}>{b.estado}</td>
                        <td style={tdStyle}>{b.fecha}</td>
                        <td style={tdStyle}>{b.hora}</td>
                        <td style={tdStyle}>
                          <button onClick={() => empezarEdicion(b)} style={btnEditar}>Editar</button>
                          <button onClick={() => eliminar(b.id, b.nombre)} style={btnEliminar}>Eliminar</button>
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

const thStyle = { padding: '12px 10px', textAlign: 'left' }
const tdStyle = { padding: '10px', verticalAlign: 'middle' }
const inputStyle = { padding: '6px 8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }
const btnEditar = { background: '#2980b9', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', marginRight: '6px', cursor: 'pointer' }
const btnEliminar = { background: '#c0392b', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }
const btnGuardar = { background: '#27ae60', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', marginRight: '6px', cursor: 'pointer' }
const btnCancelar = { background: '#7f8c8d', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }

export default AdminBiomarcadores