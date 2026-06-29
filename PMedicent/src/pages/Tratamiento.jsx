import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import API from '../api'

const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
const DIAS_LABEL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Tratamiento() {
  const navigate = useNavigate()
  const usuarioData = JSON.parse(localStorage.getItem('usuario') || '{}')
  const [usuario] = useState({ nombre: `${usuarioData.nombre || ''} ${usuarioData.apellido || ''}`.trim() })
  const [medicamentos, setMedicamentos] = useState([])
  const [cargando, setCargando] = useState(true)

  const [modalAbierto, setModalAbierto] = useState(false)
  const [form, setForm] = useState({
    nombre: '', dosis: '', via: 'Oral', horario: '', duracion: '', frecuencia: 'Diario'
  })
  const [diasSel, setDiasSel] = useState([])
  const [guardando, setGuardando] = useState(false)
  const [errorForm, setErrorForm] = useState('')

  const VIAS = ['Oral', 'Intravenosa', 'Subcutánea', 'Tópica', 'Inhalatoria', 'Sublingual']

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    setCargando(true)
    try {
      const meds = await API.getMedicamentos()
      setMedicamentos(meds)
    } catch (err) {
      console.error('Error cargando medicamentos:', err)
    } finally {
      setCargando(false)
    }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const toggleDia = (dia) => {
    setDiasSel(prev => prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia])
  }

  const handleAgregarMed = async (e) => {
    e.preventDefault()
    setErrorForm('')

    if (form.frecuencia === 'Días específicos' && diasSel.length === 0) {
      setErrorForm('Selecciona al menos un día.')
      return
    }

    setGuardando(true)
    try {
      await API.crearMedicamento({
        nombre: form.nombre,
        dosis: form.dosis,
        via: form.via,
        frecuencia: form.frecuencia,
        horario: form.horario,
        duracion: form.duracion,
      })

      setModalAbierto(false)
      setForm({ nombre: '', dosis: '', via: 'Oral', horario: '', duracion: '', frecuencia: 'Diario' })
      setDiasSel([])
      await cargarDatos()
    } catch (err) {
      console.error(err)
      setErrorForm('Error al guardar el medicamento.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="tratamiento-container">

          <div className="tratamiento-usuario">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
              alt="Perfil"
              className="user-avatar"
            />
            <div className="nombre">{usuario.nombre}</div>
          </div>

          <h1 className="tratamiento-titulo">Tratamiento</h1>
          <p className="tratamiento-subtitulo">Medicamentos registrados</p>

          {cargando ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Cargando medicamentos...</p>
          ) : (
            <div className="calendar-table-container">
              <table className="calendar-table">
                <thead>
                  <tr>
                    <th>Medicamento</th>
                    <th>Dosis</th>
                    <th>Frecuencia diaria</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                        No hay medicamentos registrados.
                      </td>
                    </tr>
                  ) : (
                    medicamentos.map(med => (
                      <tr key={med.id}>
                        <td>{med.nombre}</td>
                        <td>{med.dosis}</td>
                        <td>{med.frecuenciaDiaria} vez/día</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="botones-tratamiento">
            <button className="btn btn-primary" onClick={() => setModalAbierto(true)}>
              <img src="https://img.icons8.com/ios-filled/24/ffffff/plus.png" alt="add" />
              Agregar Medicamento
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/registrar-toma')}>
              <img src="https://img.icons8.com/ios-filled/24/ffffff/pill.png" alt="pills" />
              Registrar Toma
            </button>
          </div>

        </div>
      </main>

      {modalAbierto && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <h2>Agregar Medicamento</h2>

            <form onSubmit={handleAgregarMed}>
              <div style={{ marginBottom: '12px' }}>
                <label>Nombre del medicamento</label>
                <input id="nombre" type="text" placeholder="Ej: Ibuprofeno" required
                  value={form.nombre} onChange={handleChange} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Dosis</label>
                <input id="dosis" type="text" placeholder="Ej: 500mg, 10ml" required
                  value={form.dosis} onChange={handleChange} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Vía de administración</label>
                <select id="via" value={form.via} onChange={handleChange}>
                  {VIAS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Hora de toma</label>
                <input id="horario" type="time" required value={form.horario} onChange={handleChange} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Duración del tratamiento</label>
                <input id="duracion" type="text" placeholder="Ej: 1 mes, 3 semanas" required
                  value={form.duracion} onChange={handleChange} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Frecuencia</label>
                <select id="frecuencia" value={form.frecuencia} onChange={handleChange}>
                  <option value="Diario">Diario</option>
                  <option value="Cada 8 horas">Cada 8 horas</option>
                  <option value="Cada 12 horas">Cada 12 horas</option>
                  <option value="Días específicos">Días específicos</option>
                </select>
              </div>

              {form.frecuencia === 'Días específicos' && (
                <div style={{ marginBottom: '12px' }}>
                  <label>Selecciona los días</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {DIAS.map((dia, i) => (
                      <button key={dia} type="button" onClick={() => toggleDia(dia)}
                        style={{
                          padding: '6px 12px', borderRadius: '20px', border: '2px solid',
                          borderColor: diasSel.includes(dia) ? '#0D6E6E' : '#ccc',
                          background: diasSel.includes(dia) ? '#0D6E6E' : '#fff',
                          color: diasSel.includes(dia) ? '#fff' : '#333',
                          cursor: 'pointer', fontWeight: '600', fontSize: '13px'
                        }}>
                        {DIAS_LABEL[i].slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {errorForm && <p style={{ color: 'red', fontSize: '0.88rem', marginBottom: '8px' }}>{errorForm}</p>}

              <div className="modal-buttons">
                <button type="button" className="btn-cancelar"
                  onClick={() => { setModalAbierto(false); setErrorForm('') }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  {guardando ? 'Guardando...' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Tratamiento