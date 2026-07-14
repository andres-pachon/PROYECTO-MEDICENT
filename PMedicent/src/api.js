const BASE_URL = 'http://127.0.0.1:5000/api';

async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const defaults = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  // Merge headers correctamente
  const mergedOptions = {
    ...options,
    headers: {
      ...defaults.headers,
      ...(options.headers || {})
    }
  };

  const res = await fetch(url, mergedOptions);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.mensaje || `Error ${res.status}: ${res.statusText}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const API = {

  // ==========================================
  // AUTENTICACIÓN (Flask + MySQL)
  // ==========================================

  async login(correo, password) {
    return apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email: correo, password })
    });
  },

  async crearUsuario(usuario) {
    return apiFetch('/register', {
      method: 'POST',
      body: JSON.stringify(usuario)
    });
  },

  async getUsuarios() {
    return apiFetch('/usuarios');
  },

  async getUsuarioPorEmail(email) {
    return apiFetch(`/usuarios?email=${encodeURIComponent(email)}`);
  },

  // ==========================================
  // TOMAS DE MEDICAMENTOS
  // ==========================================

  async getTomas() {
    return apiFetch('/tomas');
  },

  async getTomasHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    return apiFetch(`/tomas?fecha=${hoy}`);
  },

  async crearToma(toma) {
    return apiFetch('/tomas', {
      method: 'POST',
      body: JSON.stringify(toma)
    });
  },

  async eliminarToma(id) {
    return apiFetch(`/tomas/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // BIOMARCADORES
  // ==========================================

  async getBiomarcadores() {
    return apiFetch('/biomarcadores');
  },

  async getBiomarcadoresHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    return apiFetch(`/biomarcadores?fecha=${hoy}`);
  },

  async getBiomarcadoresPorFecha(fecha) {
    return apiFetch(`/biomarcadores?fecha=${fecha}`);
  },

  async crearBiomarcador(bio) {
    return apiFetch('/biomarcadores', {
      method: 'POST',
      body: JSON.stringify(bio)
    });
  },

  // ==========================================
  // INVENTARIO Y MEDICAMENTOS
  // ==========================================

  async getInventario() {
    return apiFetch('/inventario');
  },

  async actualizarInventario(id, datos) {
    return apiFetch(`/inventario/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(datos)
    });
  },

  async getMedicamentos() {
    return apiFetch('/medicamentos');
  },

  async crearMedicamento(medicamento) {
    return apiFetch('/medicamentos', {
      method: 'POST',
      body: JSON.stringify(medicamento)
    });
  },

  async eliminarMedicamento(id) {
    return apiFetch(`/medicamentos/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // TRATAMIENTOS Y CONSUMO
  // ==========================================

  async getTratamientoSemana() {
    return apiFetch('/tratamientoSemana');
  },

  async crearTratamientoSemana(entrada) {
    return apiFetch('/tratamientoSemana', {
      method: 'POST',
      body: JSON.stringify(entrada)
    });
  },

  async eliminarTratamientoSemana(id) {
    return apiFetch(`/tratamientoSemana/${id}`, { method: 'DELETE' });
  },

  async getRangos() {
    return apiFetch('/rangos');
  },

  async getProximaToma() {
    return apiFetch('/proximaToma');
  },

  async getConsumo() {
    return apiFetch('/consumo');
  }

};

export default API;