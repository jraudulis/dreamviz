import './ConfirmModal.css'

function ConfirmModal ({message, onConfirm, onCancel}) {

  return (
    <div className="confirm-backdrop">
      <div className="confirm-modal">
        <p>{message}</p>

        <div className="confirm-actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;