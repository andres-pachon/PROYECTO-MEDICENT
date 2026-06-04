import {Link} from 'react-router-dom';
function Footer() {
    return (
        <>
         <footer className="footer">
            <div className="container">
                <ul className="footer-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </footer>
        </>
    );
}
export default Footer;