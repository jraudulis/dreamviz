import './Input.css';
import { useState } from 'react';

function Input() {

  const [input, setInput] = useState('');

    function onInputChange(event) {
    setInput(event.target.value);
    console.log(input);
  }
    return (
    <div className="input-wrapper container">
      <form>
        <textarea value={input} onChange={onInputChange}
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