const BASE_URL = 'http://localhost:3000';



async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaults = {
    headers: { 'Content-Type': 'application/json' }
  };
  const res = await fetch(url, { ...defaults, ...options });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const API = {

 

  async getUsuarios() {
    return apiFetch('/usuarios');
  },

  async getUsuarioPorEmail(email) {
    return apiFetch(`/usuarios?email=${encodeURIComponent(email)}`);
  },

  async crearUsuario(usuario) {
    return apiFetch('/usuarios', {
      method: 'POST',
      body: JSON.stringify({ ...usuario, id: Date.now().toString() })
    });
  },

  

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
      body: JSON.stringify({ ...toma, id: Date.now() })
    });
  },

  async eliminarToma(id) {
    return apiFetch(`/tomas/${id}`, { method: 'DELETE' });
  },

  

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
      body: JSON.stringify({ ...bio, id: Date.now() })
    });
  },

 

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

  

  async getTratamientoSemana() {
    return apiFetch('/tratamientoSemana');
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