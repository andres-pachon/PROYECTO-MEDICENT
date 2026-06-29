import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [estaLogueado, setEstaLogueado] = useState(!!localStorage.getItem('usuario'));

  useEffect(() => {
    setEstaLogueado(!!localStorage.getItem('usuario'));
  }, [location]);

  const showFullMenu = !['/', '/inicio-sesion', '/registro', '/elegir-rol'].includes(location.pathname);

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setEstaLogueado(false);
    navigate('/inicio-sesion');
  };

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

          {estaLogueado ? (
            <li>
              <button
                onClick={handleCerrarSesion}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
              >
                Cerrar sesión
              </button>
            </li>
          ) : (
            <>
              <li><Link to="/registro">Registrarse</Link></li>
              <li><Link to="/inicio-sesion">Iniciar sesión</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;