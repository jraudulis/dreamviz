import './Gallery.css';
import { Link } from 'react-router-dom';
import city from '../../assets/images/city.webp';
import forest from '../../assets/images/forest.webp';
import moon from '../../assets/images/moon.webp';
import ocean from '../../assets/images/ocean.webp';
import sailing from '../../assets/images/sailing.webp';

function Gallery() {
    return (
        <>

        <section id="gallery">
  <h2 className="section-title">Explore what's possible</h2>

  <div className="gallery-layout">

    <div className="featured-dream">
      <img src={moon} alt="" />

      <div className="dream-overlay">
        <span className="dream-tag">Dreamcore</span>

        <h3>Falling Through the Moon</h3>

        <p>
          “Endless stairs to the moon through clouds”
        </p>
      </div>
    </div>

    <div className="gallery-grid">

      <div className="dream-card">
        <img src={city} alt="" />

        <div className="dream-info">
          <h4>Floating City</h4>
          <span className="dream-tag">Cyberpunk</span>
        </div>
      </div>

      <div className="dream-card">
        <img src={forest} alt="" />

        <div className="dream-info">
          <h4>Glass Forest</h4>
          <span className="dream-tag">Fantasy</span>
        </div>
      </div>

      <div className="dream-card">
        <img src={ocean} alt="" />

        <div className="dream-info">
          <h4>Sky Ocean</h4>
          <span className="dream-tag">Dreamcore</span>
        </div>
      </div>

      <div className="dream-card">
        <img src={sailing} alt="" />

        <div className="dream-info">
          <h4>Sky Ocean</h4>
          <span className="dream-tag">Dreamscape</span>
        </div>
      </div>

    </div>

    <div className="btn-container">
        <Link
           to='/home' className='btn btn-secondary glow-btn'>
              Start Dreaming
        </Link>
    </div>

  </div>
</section>

        </>
    )
}

export default Gallery;