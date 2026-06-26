import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  // Solo mostrar Dashboard, Tratamiento y Biomarcadores cuando NO esté en Inicio ni en páginas de auth
  const showFullMenu = !['/', '/inicio-sesion', '/registro', '/elegir-rol'].includes(location.pathname);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">MEDICENT</Link>
        
        <ul className="nav-links">
          {showFullMenu && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/tratamiento">Tratamiento</Link></li>
              <li><Link to="/tomar-biomarcadores">Biomarcadores</Link></li>
            </>
          )}
          
          <li><Link to="/registro">Registrarse</Link></li>
          <li><Link to="/inicio-sesion">Iniciar sesión</Link></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;