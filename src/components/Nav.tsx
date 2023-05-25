import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Nav = () => {
    const [isActive, setActive] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('pollExist');
            navigate('/login')
          } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return ( 
        <>
            <nav className={"navbar target " + (isActive ? 'change': null)}>
                <Link to={`/`} className="nav-link">
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </Link>
                <Link to={`tovisit`} className="nav-link">
                    <i className="fas fa-car-side"></i>
                    <span>To Visit</span>
                </Link>
                {
                    token ? (
                        <button className="nav-link" onClick={handleLogout}>
                            <i className="fas fa-right-from-bracket"></i>
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link to={`login`} className="nav-link">
                            <i className="fas fa-id-card"></i>
                            <span>Login</span>
                        </Link>
                    )
                }
            </nav>
            <div className={"menu target " + (isActive ? 'change': null)}  onClick={() => setActive(!isActive)}></div>
        </>
    );
}

const NavbarWrapper = () => {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    )
};
 
export default NavbarWrapper;