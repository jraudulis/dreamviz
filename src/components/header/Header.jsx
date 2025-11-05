import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
      <header>
      <nav>
        <div className="logo-wrapper">
          <img src="src/assets/logo.png" alt="" className="logo" />
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