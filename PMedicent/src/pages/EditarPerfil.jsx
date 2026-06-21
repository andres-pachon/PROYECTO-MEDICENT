// src/pages/EditarPerfil.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaFormulario from '../components/TarjetaFormulario';
import CampoTexto from '../components/CampoTexto';
import Button from '../components/Button';
import API from '../api';

function EditarPerfil() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    contacto_emergencia: ''
  });

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuarios = await API.getUsuarios();
        const usuarioActual = usuarios.find(u => u.id === "1") || usuarios[0];

        if (usuarioActual) {
          setForm({
            nombre: usuarioActual.nombre || '',
            email: usuarioActual.email || '',
            telefono: usuarioActual.telefono || '',
            edad: usuarioActual.edad || '',
            contacto_emergencia: usuarioActual.contacto_emergencia || ''
          });
        }
      } catch (err) {
        console.error('Error cargando usuario:', err);
        setError('No se pudieron cargar los datos');
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError('');
    setSuccess(false);

    try {
      const usuarios = await API.getUsuarios();
      const usuarioActual = usuarios.find(u => u.id === "1") || usuarios[0];

      if (usuarioActual) {
        await fetch(`http://localhost:3000/usuarios/${usuarioActual.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...usuarioActual,
            nombre: form.nombre,
            email: form.email,
            telefono: form.telefono,
            edad: form.edad,
            contacto_emergencia: form.contacto_emergencia
          })
        });

        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      setError('Error al guardar los cambios');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>Cargando...</div>;
  }

  return (
    <TarjetaFormulario titulo="Editar Perfil" onSubmit={handleSubmit}>
      <CampoTexto 
        label="Nombre Completo" 
        id="nombre" 
        value={form.nombre} 
        onChange={handleChange} 
        required 
      />
      <CampoTexto 
        label="Correo Electrónico" 
        id="email" 
        type="email"
        value={form.email} 
        onChange={handleChange} 
        required 
      />
      <CampoTexto 
        label="Teléfono de Contacto" 
        id="telefono" 
        type="tel" 
        value={form.telefono} 
        onChange={handleChange} 
        required 
      />
      <CampoTexto 
        label="Edad" 
        id="edad" 
        type="number" 
        value={form.edad} 
        onChange={handleChange} 
      />
      <CampoTexto 
        label="Contacto de Emergencia" 
        id="contacto_emergencia" 
        placeholder="Ej: María Pérez - 3123456789"
        value={form.contacto_emergencia} 
        onChange={handleChange} 
      />

      {error && <p style={{ color: 'red', textAlign: 'center', margin: '15px 0' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center', margin: '15px 0' }}>Cambios guardados correctamente</p>}

      <Button texto={guardando ? "Guardando..." : "Guardar Cambios"} />
    </TarjetaFormulario>
  );
}

export default EditarPerfil;