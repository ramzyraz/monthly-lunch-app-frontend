import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <section className="section-4">
            <div className="section-4-text">
                <h2 className="section-4-heading">Places to Visit Yet</h2>
                <p className="section-4-p">Woohoo!! New Places To Visit</p>
            </div>
            <div className="footer-buttons">
                <Link to={`tovisit`} className="redirect-link" style={{ marginBottom: '2rem' }}>
                    <span className="redirect-link-text">Places To Visit</span>
                    <i className="fas fa-car-side redirect-link-icon"></i>
                </Link>
                <Link to={`addvisit`} className="redirect-link">
                    <span className="redirect-link-text">Add New Place</span>
                    <i className="fas fa-car-side redirect-link-icon"></i>
                </Link>
            </div>
            <p className="copyright">
                Ramez Salman &copy; 2023
            </p>
        </section>
    );
}
 
export default Footer;
