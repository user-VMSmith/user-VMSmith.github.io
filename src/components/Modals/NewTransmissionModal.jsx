import './NewTransmissionModal.css'

export default function NewTransmissionModal({ isOpen, handleClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>×</button>
                {children}
            </div>
        </div>
    );
}
