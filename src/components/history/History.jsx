import './History.css';
import { useState } from 'react';


function History({history, handleDeleteClick, shareImage, downloadImage}) {

  const [selectedImage, setSelectedImage] = useState(null);

    return (
      <>
  <div className="history-wrapper">

    { history.length > 0 ? <h1>Your History</h1> : <h2>No history to display</h2> }
    
    <div className="history-list">
      {history.map((item, index) => (
        <div key={index} onClick={() => setSelectedImage(item)} className="history-card">
          <div className="image-wrapper">
            <img src={item.image} alt={item.prompt} className="history-image" />
          </div>
          
          <div className="card prompt-wrapper">
            <p className="history-prompt">{item.prompt}</p>
          </div>
        </div>
      ))}
  </div>
 </div>

 {selectedImage && (
  <div className="overlay">
    <img src={selectedImage.image} alt={selectedImage.input} />
    <p>{selectedImage.input}</p>
    <div className="btn-wrapper">
    <button className='btn btn-secondary glow-btn' onClick={() => downloadImage(selectedImage.image)}>Download</button>
    <button className='btn btn-secondary glow-btn' onClick={() => shareImage(selectedImage.image)}>Share</button>
    {<button className='btn btn-secondary glow-btn' onClick={() =>handleDeleteClick(selectedImage, setSelectedImage(null) )}>Delete</button>}
    <button className='btn btn-secondary glow-btn' onClick={() => setSelectedImage(null)}>Close</button>
    </div>
  </div>
)}

    </>
    )
}

export default History;