function Image({image}) {
    return (
    <div className="image-gallery container">
        <div className="image-card" >
          <img src={image} alt="generated image" />
        </div>
    </div>
    )
}

export default Image;