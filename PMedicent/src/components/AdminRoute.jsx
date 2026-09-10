import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  const userData = localStorage.getItem('usuario')

  // Si no hay token o no hay datos de usuario → mandar a login
  if (!token || !userData) {
    return <Navigate to="/inicio-sesion" replace />
  }

  try {
    const user = JSON.parse(userData)

    // Si no es admin → mandar al dashboard normal
    if (user.rol !== 'admin') {
      return <Navigate to="/dashboard" replace />
    }

    // Si es admin → dejar pasar
    return children
  } catch (error) {
    // Si el JSON está dañado → mandar a login
    return <Navigate to="/inicio-sesion" replace />
  }
}

export default AdminRoute