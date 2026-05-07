import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import city from '../../assets/images/city.webp';
import forest from '../../assets/images/forest.webp';
import moon from '../../assets/images/moon.webp';
import ocean from '../../assets/images/ocean.webp';

function LandingPage () {

     const navigate = useNavigate();

    return (
    <>
       <header>
        <div className="header-wrapper">
        <h1>Revisit and explore your dreams with DreamViz.</h1>
        <p>Turn your dreams into surreal AI-generated art.</p>

        <div className="actions">
          <Link to='/register' className='btn btn-primary glow-btn'>
              Get Started
          </Link>
          <a href='#how-it-works' className='btn btn-secondary glow-btn'>
              How it works
          </a>
        </div>

          <div className="signin-link">
            Already a member?
            <Link to='/signin'> Sign in</Link>
          </div>
    </div>
    </header>

     <section id="how-it-works">
      <h2 className="section-title">How it works</h2>

      <div className="cards">
        <div className="card">
          <div className="step">01</div>
          <h3>Describe your dream</h3>
          <p>
            Write anything you remember — emotions, scenes, fragments or surreal ideas.
          </p>
        </div>

        <div className="card">
          <div className="step">02</div>
          <h3>AI generates your vision</h3>
          <p>
            DreamViz transforms your text into a surreal AI-generated artwork.
          </p>
        </div>

        <div className="card">
          <div className="step">03</div>
          <h3>Download & share</h3>
          <p>
            Save your dream image or share it instantly with others.
          </p>
        </div>
      </div>
    </section>

    <section id="gallery">
  <h2 className="section-title">Dream Gallery</h2>

  <div className="gallery-grid">

    <div className="dream-card">
      <img src= {city} alt="Dream example" />

      <div className="dream-content">
        <h3>Floating City</h3>

        <p>
          “A neon city drifting above an endless ocean at sunset.”
        </p>
      </div>
    </div>

    <div className="dream-card">
      <img src= {forest} alt="Dream example" />

      <div className="dream-content">
        <h3>Glass Forest</h3>

        <p>
          “Walking through a forest made entirely of crystal.”
        </p>
      </div>
    </div>

    <div className="dream-card">
      <img src= {moon} alt="Dream example" />

      <div className="dream-content">
        <h3>Stairway to moon</h3>

        <p>
          “An endless staircase leading into the moon through clouds.”
        </p>
      </div>
    </div>

    <div className="dream-card">
      <img src= {ocean} alt="Dream example" />

      <div className="dream-content">
        <h3>Ocean in the sky</h3>

        <p>
          “An ocean floating above the clouds with ships sailing through the sky.”
        </p>
      </div>
    </div>

  </div>
</section>

<section id="features">
  <h2 className="section-title">Why DreamViz?</h2>

  <div className="features-grid">

    <div className="feature-card">
      <div className="feature-icon">🌙</div>

      <h3>Turn dreams into art</h3>

      <p>
        Transform surreal memories and emotions into unique AI-generated visuals.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">⚡</div>

      <h3>Generate instantly</h3>

      <p>
        Create cinematic dream-inspired artwork in just a few seconds.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🎨</div>

      <h3>Endless creativity</h3>

      <p>
        Experiment with impossible worlds, dreamcore aesthetics and surreal ideas.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">📥</div>

      <h3>Download & share</h3>

      <p>
        Save your generated dreams or share them instantly with others.
      </p>
    </div>

  </div>
</section>

<section id="cta">
  <div className="cta-box">
    <h2>Ready to visualize your dreams?</h2>

    <p>
      Start creating surreal AI-generated art from your imagination in seconds.
    </p>

    <div className="cta-actions">
      <Link to="/register" className="btn btn-primary glow-btn">
        Get Started
      </Link>

      <Link to="/signin" className="btn btn-secondary">
        Sign in
      </Link>
    </div>
  </div>
</section>

</>

        
    )
};

export default LandingPage;