import './Input.css';

function Input() {
    return (
    <div className="input-wrapper container">
      <form>
        <textarea
          className="dream-textarea"
          placeholder="Describe your dream..."
        />
        <button type="submit" className="generate-button">
          Visualize Dream
        </button>
      </form>
    </div>
    )
}

export default Input;