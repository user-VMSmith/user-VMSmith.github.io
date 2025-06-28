import React, {useState} from "react";

export default function Pearl({pearl, handleDeletePearl}) {

    const [expanded, setExpanded] = useState(false);

    function togglePearlExpandCollapse() {
        setExpanded(prev => !prev);
    }

    // TODO: handleFilterMessagesByRune(pearl.pearl_id)
    return (
        <div className="powerlanguage-item pearl-details " onClick={togglePearlExpandCollapse}>
            <div className="pearl-actions">
                <button
                    className="delete-pearl-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePearl(pearl.pearl_id);
                    }}

                    title="Delete"
                >
                    ×
                </button>
                <button
                    className="edit-pearl-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        // onEditPearl(pearl)
                    }}
                    title="Edit"
                >
                    ✎
                </button>
            </div>
            <div className="pearl-body">
                <label>
                    <input type="checkbox" readOnly checked={expanded}/>
                    {' '}

                </label>

                <div className="pearl-info">
                    <span className="pearl-repr">{pearl.name ?? pearl.repr}</span>
                    {Math.floor(Math.random() * 50) + 1} messages
                </div>
            </div>


            {expanded && (
                <div className="pearl-expanded">
                    {pearl.hayu && <span><strong>Hayu:</strong> {pearl.hayu}</span>}
                    <br/>
                    {pearl.tone && <span><strong>Tone:</strong> {pearl.tone}</span>}
                    <br/>
                    {pearl.repr && <span><strong>Repr:</strong> {pearl.repr}</span>}
                </div>
            )}
        </div>
    );
}