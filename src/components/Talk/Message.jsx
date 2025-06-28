import Block from "./Block.jsx";
import React from "react";

export default function Message({mi, message, onEditMessage, onDeleteMessage, selectedRune, setSelectedRune}) {

    //TODO: Switch onEditMessage to onSelectMessage
    return (
        <div className="message" key={mi} onClick={() => onEditMessage(message)}>
            <div className="message-details">
                <div className="message-actions">
                    <button
                        className="delete-message-button"
                        onClick={(e) => {
                            e.stopPropagation(); // prevent triggering onEditMessage
                            onDeleteMessage();
                        }}
                        title="Delete"
                    >
                        ×
                    </button>
                    <button
                        className="edit-message-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditMessage(message)
                        }}
                        title="Edit"
                    >
                        ✎
                    </button>
                </div>
                <div className="timestamp column">
                    {message.submitTime
                        ? new Date(message.submitTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                        : '??'}
                </div>

                <div className="speaker column">{message.userName}</div>

            </div>

            <div className="block-container">
                {
                    message.tree.map(
                        (block, bi) => (
                            <Block key={bi} block={block} selectedRune={selectedRune}
                            setSelectedRune={setSelectedRune}/>
                        )
                    )
                }
            </div>

        </div>
    )
}