import {Link} from 'react-router-dom';
function Header() {
    return (
    <>
    <header className="navbar">
        <div className="container">
            <a href="#" className="logo">Medicent</a>
            <ul className="nav-links">
                <li><Link to="/register">Registrarse</Link></li>
                <li><Link to="/login">Iniciar sesión</Link></li>
            </ul>
        </div>
    </header>
    </>
    );
}
export default Header;