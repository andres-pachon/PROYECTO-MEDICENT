import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">Medicent</Link>
        <ul className="nav-links">
          <li><Link to="/registro">Registrarse</Link></li>
          <li><Link to="/inicio-sesion">Iniciar sesión</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header;