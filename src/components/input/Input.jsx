import './Input.css';
import { useState } from 'react';

function Input({onBtnSubmit}) {

  const [input, setInput] = useState('');

    function onInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onBtnSubmit(input);
  }
    return (
    <div className="input-wrapper container">
      <form onSubmit={handleSubmit}>
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