import './SuccessMessage.css';

function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="success-message">
      <p>{message}</p>
    </div>
  );
}

export default SuccessMessage;