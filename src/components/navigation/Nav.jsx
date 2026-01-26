import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Nav.css';

function Nav({user, fetchHistory, logout}) {

  const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <div className='wrapper'>
      <nav>
        <div className="logo-wrapper">
          <h2 className="logo">
            DreamViz<span className="logo-span">.ai</span>
          </h2>
        </div>
        <div className="nav-wrapper">
          <div className='name'>Hello, {user.name}</div>
          <Link className="nav-item" to="/home">Home</Link>
          <Link onClick={fetchHistory} className="nav-item" to="/History">History</Link>
          <Link className="nav-item" to="/About">About</Link>
          <Link onClick={logout} className='nav-item'>Log out</Link>
        </div>
        {/* Burger button (mobile only) */}
        <div
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />

        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="nav-mobile">
          <Link onClick={() => setMenuOpen(false)} className='nav-item' to="/home">Home</Link>
          <Link onClick={() => {setMenuOpen(false), fetchHistory()} } className="nav-item" to="/History">History</Link>
          <Link onClick={() => setMenuOpen(false)} className="nav-item" to="/About">About</Link>
          <Link onClick={logout} className='nav-item'>Log out</Link>
        </nav>
      )}

    </div>
    )
}

export default Nav;