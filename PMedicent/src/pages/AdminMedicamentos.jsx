import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import API from '../api'

function AdminMedicamentos() {
  const navigate = useNavigate()
  const [medicamentos, setMedicamentos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    concentracion: '',
    frecuenciaDiaria: '',
    fechaVencimiento: ''
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
    cargarMedicamentos()
  }, [navigate])

  const cargarMedicamentos = async () => {
    try {
      setCargando(true)
      const data = await API.getAdminMedicamentos()
      setMedicamentos(data || [])
    } catch (error) {
      console.error(error)
      setMensaje('Error al cargar medicamentos: ' + error.message)
    } finally {
      setCargando(false)
    }
  }

  const empezarEdicion = (med) => {
    setEditando(med.id)
    setForm({
      nombre: med.nombre || '',
      concentracion: med.concentracion || '',
      frecuenciaDiaria: med.frecuenciaDiaria || '',
      fechaVencimiento: med.fechaVencimiento || ''
    })
    setMensaje('')
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setForm({ nombre: '', concentracion: '', frecuenciaDiaria: '', fechaVencimiento: '' })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const guardarCambios = async (id) => {
    try {
      await API.actualizarMedicamento(id, {
        nombre: form.nombre,
        concentracion: form.concentracion,
        frecuenciaDiaria: form.frecuenciaDiaria,
        fechaVencimiento: form.fechaVencimiento
      })
      setMensaje('Medicamento actualizado correctamente')
      setEditando(null)
      cargarMedicamentos()
    } catch (error) {
      setMensaje('Error al actualizar: ' + error.message)
    }
  }

  const eliminar = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que quieres eliminar el medicamento "${nombre}"?`)) return

    try {
      await API.eliminarMedicamentoAdmin(id)
      setMensaje('Medicamento eliminado correctamente')
      cargarMedicamentos()
    } catch (error) {
      setMensaje('Error al eliminar: ' + error.message)
    }
  }

  return (
    <>
      <Header />
      <main style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h1>Gestión de Medicamentos</h1>
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
          <p>Cargando medicamentos...</p>
        ) : medicamentos.length === 0 ? (
          <p>No hay medicamentos registrados.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: '#1d3b5e', color: 'white' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nombre</th>
                  <th style={thStyle}>Concentración</th>
                  <th style={thStyle}>Frecuencia Diaria</th>
                  <th style={thStyle}>Fecha Vencimiento</th>
                  <th style={thStyle}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((m) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    {editando === m.id ? (
                      <>
                        <td style={tdStyle}>{m.id}</td>
                        <td style={tdStyle}>
                          <input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="concentracion" type="number" value={form.concentracion} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="frecuenciaDiaria" type="number" value={form.frecuenciaDiaria} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input name="fechaVencimiento" type="date" value={form.fechaVencimiento} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <button onClick={() => guardarCambios(m.id)} style={btnGuardar}>Guardar</button>
                          <button onClick={cancelarEdicion} style={btnCancelar}>Cancelar</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tdStyle}>{m.id}</td>
                        <td style={tdStyle}>{m.nombre}</td>
                        <td style={tdStyle}>{m.concentracion} mg</td>
                        <td style={tdStyle}>{m.frecuenciaDiaria}</td>
                        <td style={tdStyle}>{m.fechaVencimiento || '-'}</td>
                        <td style={tdStyle}>
                          <button onClick={() => empezarEdicion(m)} style={btnEditar}>Editar</button>
                          <button onClick={() => eliminar(m.id, m.nombre)} style={btnEliminar}>Eliminar</button>
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

export default AdminMedicamentos