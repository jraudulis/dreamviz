import './Image.css';

function Image({image, setImage, downloadImage, shareImage}) {
if (!image) return null;
    return (
    <div className="overlay">
    <img src={image} alt='your image' />
    <div className="btn-wrapper">
    <button onClick={() => downloadImage(image)}>Download</button>
    <button onClick={() => shareImage(image)}>Share</button>
    <button onClick={() => setImage(null)}>Close</button>
    </div>
  </div>

    )
}

export default Image;