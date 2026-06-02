import {Link} from 'react-router-dom';
function Header() {
    return (
    <>
    <header class="navbar">
        <div class="container">
            <a href="#" class="logo">Medicent</a>
            <ul class="nav-links">
                <li><Link to="/register">Registrarse</Link></li>
                <li><Link to="/login">Iniciar sesión</Link></li>
            </ul>
        </div>
    </header>
    </>
    );
}
export default Header;