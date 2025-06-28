/**
 * Recursively renders a single rune: either a string or an array of runes.
 */
export default function Rune({
                                 rune,
                                 capsuleLevel = 0,
                                 selectedRune,
                                 setSelectedRune,
                                 parentSelected = false
                             }) {

    const isSelected = rune === selectedRune;
    // const isHoverable = parentSelected || (!selectedRune && capsuleLevel === 0);
    const isHoverable = parentSelected || (capsuleLevel === 0);


    function handleRuneClick(e) {
        e.stopPropagation(); // prevent bubbling to parent capsules
        // if (!parentSelected && typeof rune === 'string') return;

        setSelectedRune(rune);
    }

    // function handleClick(e) {
    //     const clickedWord = e.target.closest('.word');
    //     if (!clickedWord) return;
    //
    //     const capsuleAncestors = getCapsuleAncestors(clickedWord);
    //
    //     // clearPreviousSelection();
    //
    //     // No capsule found before hitting .message → select the word itself
    //     if (capsuleAncestors.length === 0) {
    //         const wordIsAlreadySelected = clickedWord?.classList.contains('selected');
    //         if (wordIsAlreadySelected) {
    //             clearPreviousSelection();
    //         } else {
    //             clearPreviousSelection();
    //             clickedWord.classList.add('selected');
    //             document.body.classList.remove('capsule-selected');
    //         }
    //         document.dispatchEvent(new CustomEvent("selectionChanged"));
    //         return;
    //     }
    //
    //     const outermostCapsule = capsuleAncestors.at(-1);
    //     if (outermostCapsule) {
    //         clearPreviousSelection();
    //         outermostCapsule.classList.toggle('selected');
    //         document.body.classList.toggle('capsule-selected');
    //         console.log('outermost capsule:', outermostCapsule);
    //         document.dispatchEvent(new CustomEvent("selectionChanged"));
    //     }
    // }

// Helper: Collects all ancestor elements with class "capsule" up to a .message boundary
    function getCapsuleAncestors(startElement) {
        const ancestors = [];
        let current = startElement.parentElement;

        while (current) {
            if (current.classList?.contains('message')) break;
            if (current.classList?.contains('capsule')) {
                ancestors.push(current);
            }
            current = current.parentElement;
        }

        return ancestors;
    }

// Helper: Deselects any currently selected capsule or word
    function clearPreviousSelection() {
        const prev = document.querySelector('.capsule.selected, .word.selected');
        if (prev) prev.classList.remove('selected');
        document.body.classList.remove('capsule-selected');
    }


    if (typeof rune === 'string') {
        const wordHoverable = isHoverable;
        return (
            // split the clause-text(or [string-type]-rune) into
            <>
                {rune.split(/\s+/).map((word, idx) => (
                    word.trim() === '' ? word :
                        <span
                            key={idx}
                            className={`word${wordHoverable ? ' hoverable' : ''}`}
                            data-level={capsuleLevel}
                            onClick={() => setSelectedRune(rune)}
                        >{word}{" "}</span>
                ))}
            </>
        );
    }

    return (
        <span
            className={`capsule${isSelected ? ' selected' : ''}${isHoverable ? ' hoverable' : ''}`}
            data-level={capsuleLevel}
            onClick={handleRuneClick}
        >
            {
                rune.map(
                    (child, i) => (
                        <Rune
                            key={i}
                            capsuleLevel={capsuleLevel + 1}
                            rune={child}
                            selectedRune={selectedRune}
                            setSelectedRune={setSelectedRune}
                            parentSelected={isSelected}
                        />
                    )
                )
            }
        </span>
    );
}