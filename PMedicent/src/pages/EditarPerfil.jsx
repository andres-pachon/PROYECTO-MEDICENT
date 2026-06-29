import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaFormulario from '../components/TarjetaFormulario';
import CampoTexto from '../components/CampoTexto';
import Button from '../components/Button';

function EditarPerfil() {
  const navigate = useNavigate();

  const usuarioData = JSON.parse(localStorage.getItem('usuario') || '{}');

  const [form, setForm] = useState({
    nombre: `${usuarioData.nombre || ''} ${usuarioData.apellido || ''}`.trim(),
    email: usuarioData.correo || '',
    telefono: '',
    edad: '',
    contacto_emergencia: ''
  });

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError('');
    setSuccess(false);

    try {
      const usuarioActualizado = {
        ...usuarioData,
        nombre: form.nombre.split(' ')[0] || usuarioData.nombre,
        apellido: form.nombre.split(' ').slice(1).join(' ') || usuarioData.apellido,
        correo: form.email
      };
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError('Error al guardar los cambios');
    } finally {
      setGuardando(false);
    }
  };

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