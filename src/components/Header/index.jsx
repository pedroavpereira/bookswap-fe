import { NavLink } from 'react-router-dom';
import './Header.css';  

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">BookNest</NavLink>
      </div>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/search">Browse</NavLink></li>
          <li><NavLink to="/swap">Swap</NavLink></li>
          <li><NavLink to="/collection">Collection</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;