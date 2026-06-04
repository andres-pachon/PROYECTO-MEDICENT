const BASE_URL = 'http://localhost:3000';

// ─── Utilidad base ────────────────────────────────────────────────────────────

async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaults = {
    headers: { 'Content-Type': 'application/json' }
  };
  const res = await fetch(url, { ...defaults, ...options });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  // DELETE devuelve 200 con {} vacío
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ─── USUARIO ─────────────────────────────────────────────────────────────────

const API = {

  // ── Tomas ──────────────────────────────────────────────────────────────────

  async getTomas() {
    return apiFetch('/tomas');
  },

  async getTomasHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    return apiFetch(`/tomas?fecha=${hoy}`);
  },

  async crearToma(toma) {
    // Asigna id basado en timestamp si JSON Server no lo hace
    return apiFetch('/tomas', {
      method: 'POST',
      body: JSON.stringify({ ...toma, id: Date.now() })
    });
  },

  async eliminarToma(id) {
    return apiFetch(`/tomas/${id}`, { method: 'DELETE' });
  },

  // ── Biomarcadores ──────────────────────────────────────────────────────────

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

  // ── Inventario ─────────────────────────────────────────────────────────────

  async getInventario() {
    return apiFetch('/inventario');
  },

  async actualizarInventario(id, datos) {
    return apiFetch(`/inventario/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(datos)
    });
  },

  // ── Medicamentos ───────────────────────────────────────────────────────────

  async getMedicamentos() {
    return apiFetch('/medicamentos');
  },

  // ── Tratamiento semanal ────────────────────────────────────────────────────

  async getTratamientoSemana() {
    return apiFetch('/tratamientoSemana');
  },

  // ── Rangos de biomarcadores ────────────────────────────────────────────────

  async getRangos() {
    return apiFetch('/rangos');
  },

  // ── Próxima toma ───────────────────────────────────────────────────────────

  async getProximaToma() {
    return apiFetch('/proximaToma');
  },

  // ── Consumo ────────────────────────────────────────────────────────────────

  async getConsumo() {
    return apiFetch('/consumo');
  }
};


export default API;