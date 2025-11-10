import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';

function Header() {
    return (
      <header>
      <nav>
        <div className="logo-wrapper">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <Link className="history" to="/History">History</Link>
      </nav>

      <div className="wrapper">
        <h1>Dream Visualizer</h1>
        <p>Turn your dreams into surreal art</p>
      </div>
    </header>
    )
}

export default Header;