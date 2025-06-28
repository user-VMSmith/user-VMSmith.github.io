import './Powerlanguage.css'
import Pearl from "./Pearl.jsx";
import React, {useState} from "react";

export default function Powerlanguage({powerlanguageData = [], handleDeletePearl, onEditPearl, updatePowerlanguage}) {

    return (
        <div className="powerlanguage-sidebar">
            <div className="powerlanguage-container">
                <div className="powerlanguage-header">
                    <h2>Powerlanguage</h2>
                    <button
                        className="new-pearl-button"
                        // onClick={handleNewRuneModalOpen}
                    >
                        +
                    </button>
                </div>

                <ul>
                    {powerlanguageData.map(pearl => (
                        <li key={pearl.pearl_id}>
                            <Pearl pearl={pearl} handleDeletePearl={handleDeletePearl}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
