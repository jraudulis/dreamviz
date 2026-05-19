import './Image.css';

function Image({image, setImage, downloadImage, shareImage}) {
if (!image) return null;
    return (
    <div className="overlay">
    <img src={image} alt='your image' />
    <div className="btn-wrapper">
    <button className='btn btn-secondary glow-btn' onClick={() => downloadImage(image)}>Download</button>
    <button className='btn btn-secondary' onClick={() => shareImage(image)}>Share</button>
    <button className='btn btn-secondary' onClick={() => setImage(null)}>Close</button>
    </div>
  </div>

    )
}

export default Image;