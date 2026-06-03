import {Link} from 'react-router-dom';
function Footer() {
    return (
        <>
         <footer class="footer">
            <div class="container">
                <ul class="footer-links">
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