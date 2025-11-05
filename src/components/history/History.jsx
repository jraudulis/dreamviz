import './History.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function History({history, handleDelete, shareImage, downloadImage}) {

  const [selectedImage, setSelectedImage] = useState(null);

  function afterDeleteCallBack() {
    setSelectedImage(null);
  }

    return (
      <>
     <nav className='hist-nav'>
      <div className="logo-wrapper">
          <img src="src/assets/logo.png" alt="" className="logo" />
        </div>
     <Link className="home-btn" to="/">Home</Link>
     </nav>
  <div className="history-wrapper">
    <h1>Your History</h1>
    <div className="history-list">
      {history.map((item, index) => (
        <div key={index} onClick={() => setSelectedImage(item)} className="history-card">
          <img src={item.image} alt={item.input} className="history-image" />
          <p className="history-prompt">{item.input}</p>
        </div>
      ))}
  </div>
 </div>

 {selectedImage && (
  <div className="overlay">
    <img src={selectedImage.image} alt={selectedImage.input} />
    <p>{selectedImage.input}</p>
    <div className="btn-wrapper">
    <button onClick={() => downloadImage(selectedImage.image)}>Download</button>
    <button onClick={() => shareImage(selectedImage.image)}>Share</button>
    {<button onClick={() =>handleDelete(selectedImage, afterDeleteCallBack)}>Delete</button>}
    <button onClick={() => setSelectedImage(null)}>Close</button>
    </div>
  </div>
)}


    </>
    )
}

export default History;