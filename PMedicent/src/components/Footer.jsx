import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/inicio-sesion">Contacto</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer