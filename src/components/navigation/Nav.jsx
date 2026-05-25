import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Nav.css';

function Nav({user, fetchHistory, logout}) {

  const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <div className='wrapper'>
      <nav>
        <div className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">
            DreamViz
          </span>
        </div>
        <div className="nav-wrapper">
          <div className='name'>Welcome back, {user.name}</div>
          <Link className="nav-item" to="/home">Home</Link>
          <Link className="nav-item" to="/gallery">Gallery</Link>
          <Link onClick={fetchHistory} className="nav-item" to="/History">History</Link>
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
      
        <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
          <Link onClick={() => setMenuOpen(false)} className='nav-item' to="/home">Home</Link>
          <Link onClick={() => setMenuOpen(false)} className='nav-item' to="/gallery">Gallery</Link>
          <Link onClick={() => {setMenuOpen(false), fetchHistory()} } className="nav-item" to="/History">History</Link>
          <Link onClick={logout} className='nav-item'>Log out</Link>
        </nav>
      

    </div>
    )
}

export default Nav;