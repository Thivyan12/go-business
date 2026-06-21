import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./../styles/navBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    navigate("/");
  };

  return (
    <nav className="navbar" aria-label="Primary">
      <Link
        className="brand"
        onClick={handleDashboardRedirect}
        aria-label="Go to dashboard home"
      >
        Go Business
      </Link>

      <div className="nav-actions">
        <button className="try-btn">
          Try for free
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;