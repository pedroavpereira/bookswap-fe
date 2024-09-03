import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import { useUser } from "../../contexts/UserContext";

const Header = () => {
  const { user, logout } = useUser();

  function handleLogout() {
    logout();
  }
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img src={logo} />
        </NavLink>
      </div>
      <nav className="navbar">
        <ul>
          {/* <li>
            <NavLink to="/" className="header-Link" end>
              Home
            </NavLink>
          </li> */}
          {user && (
            <>
              <li>
                <NavLink className="header-link" to="/swap">
                  Swap
                </NavLink>
              </li>
              <li>
                <NavLink className="header-link" to="/collection">
                  Collection
                </NavLink>
              </li>
              <li>
                <NavLink className="header-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <a onClick={handleLogout} className="header-link">
                  Logout
                </a>
              </li>
            </>
          )}
          {!user && (
            <>
              {" "}
              <li>
                <NavLink className="header-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="header-Link" to="/signup">
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
