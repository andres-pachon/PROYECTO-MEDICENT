import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import API from '../api'

const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
const DIAS_LABEL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Tratamiento() {
  const navigate = useNavigate()
  const [usuario] = useState({ nombre: 'Rodrigo Lopez' })
  const [tratamiento, setTratamiento] = useState([])
  const [consumo, setConsumo] = useState(null)
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
      const [trat, cons, meds] = await Promise.all([
        API.getTratamientoSemana(),
        API.getConsumo(),
        API.getMedicamentos()
      ])
      setTratamiento(trat)
      setConsumo(cons)
      setMedicamentos(meds)
    } catch (err) {
      console.error('Error cargando tratamiento:', err)
    } finally {
      setCargando(false)
    }
  }

  
  const horasUnicas = [...new Set(tratamiento.map(t => t.hora))].sort()

  const getCelda = (hora, dia) => {
    return tratamiento.filter(t => t.hora === hora && t.dia === dia)
  }

  
  const porcentaje = consumo?.porcentaje ?? 0
  const circunferencia = 94.2
  const dashoffset = circunferencia - (circunferencia * porcentaje) / 100

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const toggleDia = (dia) => {
    setDiasSel(prev => prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia])
  }

  const handleAgregarMed = async (e) => {
    e.preventDefault()
    setErrorForm('')

    const frecuenciaFinal = form.frecuencia === 'Días específicos'
      ? diasSel.map(d => DIAS_LABEL[DIAS.indexOf(d)]).join(', ')
      : form.frecuencia

    if (form.frecuencia === 'Días específicos' && diasSel.length === 0) {
      setErrorForm('Selecciona al menos un día.')
      return
    }

    setGuardando(true)
    try {
      
      const nuevoMed = await API.crearMedicamento({
        usuarioId: 1,
        nombre: form.nombre,
        dosis: form.dosis,
        via: form.via,
        frecuencia: frecuenciaFinal,
        horario: form.horario,
        duracion: form.duracion,
        estado: 'activo'
      })

     
      const diasParaAgregar = form.frecuencia === 'Días específicos'
        ? diasSel
        : form.frecuencia === 'Diario' ? DIAS : []

      for (const dia of diasParaAgregar) {
        await API.crearTratamientoSemana({
          dia,
          hora: form.horario,
          medicamento: form.nombre,
          medicamentoId: nuevoMed.id
        })
      }

      setModalAbierto(false)
      setForm({ nombre: '', dosis: '', via: 'Oral', horario: '', duracion: '', frecuencia: 'Diario' })
      setDiasSel([])
      await cargarDatos()
    } catch (err) {
      console.error(err)
      setErrorForm('Error al guardar. Verifica que json-server esté corriendo.')
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
          <p className="tratamiento-subtitulo">Esta semana</p>

          
          {cargando ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Cargando tratamiento...</p>
          ) : (
            <div className="calendar-table-container">
              <table className="calendar-table">
                <thead>
                  <tr>
                    <th className="hora-header"></th>
                    {DIAS_LABEL.map(d => <th key={d}>{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {horasUnicas.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                        No hay medicamentos en el tratamiento esta semana.
                      </td>
                    </tr>
                  ) : (
                    horasUnicas.map(hora => (
                      <tr key={hora}>
                        <td className="hora-header">{hora}</td>
                        {DIAS.map(dia => {
                          const celdas = getCelda(hora, dia)
                          return (
                            <td key={dia}>
                              {celdas.map(c => (
                                <div key={c.id} className="medicamento-celda">
                                  <span className="med-nombre">{c.medicamento}</span>
                                </div>
                              ))}
                            </td>
                          )
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          
          <div className="botones-tratamiento">
            <button
              className="btn btn-primary"
              onClick={() => setModalAbierto(true)}
            >
              <img src="https://img.icons8.com/ios-filled/24/ffffff/plus.png" alt="add" />
              Agregar Medicamento
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/registrar-toma')}
            >
              <img src="https://img.icons8.com/ios-filled/24/ffffff/pill.png" alt="pills" />
              Registrar Toma
            </button>
          </div>

          
          {consumo && (
            <div className="consumo-card">
              <h2 className="consumo-title">Consumo</h2>
              <div className="consumo-content">
                <div className="pie-chart">
                  <svg width="180" height="180" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="21" cy="21" r="15" fill="none"
                      stroke="#14b8a6"
                      strokeWidth="8"
                      strokeDasharray={circunferencia}
                      strokeDashoffset={dashoffset}
                      strokeLinecap="round"
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                    <text x="21" y="21" textAnchor="middle" dominantBaseline="middle"
                      fontSize="7" fontWeight="bold" fill="#1d3b5e">
                      {consumo.porcentaje}%
                    </text>
                  </svg>
                </div>
                <div className="consumo-info">
                  <p className="consumo-text">
                    Has consumido el <strong>{consumo.porcentaje}%</strong> del suministro de <strong>{consumo.medicamento}</strong>
                  </p>
                  <p className="compra-text">
                    Debes comprar {consumo.medicamento} el día:<br />
                    <strong>{consumo.fechaCompra}</strong>
                  </p>
                </div>
              </div>
              <div className="text-center">
                <button className="btn-inventario" onClick={() => navigate('/mis-suministros')}>
                  Ver Inventario
                </button>
              </div>
            </div>
          )}

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