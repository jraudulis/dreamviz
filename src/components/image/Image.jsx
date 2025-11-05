import './image.css';

function Image({image}) {
if (!image) return null;
    return (
    <div className="image-gallery">
        <div className="image-card" >
          <img src={image} alt="generated image" className="generated-image"/>
        </div>
    </div>
    )
}

export default Image;