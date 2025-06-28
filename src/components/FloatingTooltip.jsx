// export default function NewTransmissionModal({ isOpen, handleClose, children }) {
//     if (!isOpen) return null;
//
//     return (
//         <div className="modal-backdrop" onClick={handleClose}>
//             <div className="modal-content" onClick={e => e.stopPropagation()}>
//                 <button className="modal-close" onClick={handleClose}>×</button>
//                 {children}
//             </div>
//         </div>
//     );
// }


// FloatingTooltip.jsx
import './FloatingTooltip.css'; // style it however

export default function FloatingTooltip({
                                            updatePowerlanguage,
                                            isOpen,
                                            handleClose,
                                            anchorRect,
                                            selectedRune,
                                            transmissions,
                                            currentTransmissionId
                                        }) {

    if (!isOpen || !anchorRect) return null;

    const style = {
        position: 'fixed',
        top: `${anchorRect.bottom + 8}px`,
        left: `${anchorRect.left}px`,
    };

    //  util to recursively join strings and nested runes into a single string (which includes the SQBRs
    function flattenRuneWithBrackets(rune) {
        if (typeof rune === 'string') return rune;
        if (Array.isArray(rune)) {
            return '[' + rune.map(flattenRuneWithBrackets).join('') + ']';
        }
        return '';
    }


    function handleAddToPowerlanguage() {

        if (!selectedRune) {
            alert('no rune has been selected');
            return;
        }

        const capsuleRepr = flattenRuneWithBrackets(selectedRune);

        const newPearl = {
            pearl_id: crypto.randomUUID(),
            name: capsuleRepr,
            repr: capsuleRepr,
            hayu: capsuleRepr,
            tone: capsuleRepr
        };

        updatePowerlanguage(prev => [...prev, newPearl]);
    }

    // function handleNamingACapsule() {
    //     const selected = document.querySelector('.selected');
    //     const text = selected?.innerText?.trim();
    //
    //     if (!text) {
    //         alert('no selected element to add');
    //         return;
    //     }
    //
    //     const newPearl = {
    //         pearl_id: crypto.randomUUID(),
    //         name: text,
    //         repr: text,
    //         hayu: '',
    //         tone: ''
    //     };
    //
    //     updatePowerlanguage(prev => [...prev, newPearl]);
    // }

    return (
        <div className="floating-tooltip" style={style} onClick={e => e.stopPropagation()}>
            <button onClick={handleAddToPowerlanguage} title="Add to Powerlanguage">➕</button>
            <button title="NAME">✒️</button>
            <button>🔗</button>
            <button>💬</button>
            <button onClick={handleClose} title="Close Tooltip">❌</button>
            {/* other buttons like ✏️ 🗑️ etc */}
        </div>
    );
}
