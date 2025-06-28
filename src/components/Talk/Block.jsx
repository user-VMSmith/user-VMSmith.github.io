import Rune from './Rune.jsx';
import {useEffect, useState} from "react";

export default function Block({block, selectedRune, setSelectedRune}) {
    // const [selectedRune, setSelectedRune] = useState(null);

    // This runs the effect fn every time the selectedRune changes
    useEffect(() => {
        if (selectedRune) {
            document.dispatchEvent(new CustomEvent("selectionChanged", {
                detail: {selectedRune}
            }));
        }
    }, [selectedRune]);


    function handleClick(e) {
        e.stopPropagation();
        // optionally do other stuff here
    }

    function handleMessageEditClick(message, idx) {
        setInputText(message.text)
        setActiveMsgIdx(idx);           // tell container which slot to swap
    }

    return (
        <div className="block column" onClick={handleClick}>
            {
                block.map(
                    (rune, i) => (
                        <Rune
                            key={i}
                            rune={rune}
                            capsuleLevel={0}
                            selectedRune={selectedRune}
                            setSelectedRune={setSelectedRune}
                            parentSelected={!selectedRune}
                        />
                    )
                )
            }
        </div>
    );
}
