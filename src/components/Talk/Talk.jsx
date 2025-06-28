import './Talk.css'
import {useRef, useState} from "react";
import useParseTree from "../../hooks/useParseTree.jsx";
import Message from "./Message.jsx";
import EditorOutput from "./EditorOutput.jsx";
import DoubleEnterTrigger from "../utils.jsx";

export default function Talk({snippets, currentTransmission, currentTransmissionId, setTransmissions, selectedRune, setSelectedRune}) {

    // EDITOR STATE
    const [inputText, setInputText] = useState('');
    const parseTree = useParseTree(inputText)

    // which msg is being edited rn
    const [activeMsgIdx, setActiveMsgIdx] = useState(null);

    // the transmission name getting edited
    const [isEditingName, setIsEditingName] = useState(false);
    const [draftName, setDraftName] = useState('');


    // Message Event Handler
    function handleMessageSubmit() {
        if (!currentTransmissionId) { //changed from currentTransmissionId
            window.alert('create / select a transmission first')
            return
        }

        const message = {
            submitTime: new Date().toISOString(), // get current time as a string
            transmissionId: currentTransmissionId,
            userName: "me",
            name: "[this message's NAME] (real original amirite?)",
            hayu: "this is a hint at your understanding of this message",
            tone: "foolin' about",
            text: inputText,              // use the current input text
            tree: parseTree               // use the current parse tree
        };

        // update only the matching transmission
        setTransmissions(function (prev) {
            return prev.map(function (tx) {
                if (tx.id !== currentTransmissionId) return tx

                const newContent =
                    activeMsgIdx != null
                        ? tx.content.map((m, i) => (i === activeMsgIdx ? message : m))
                        : [...tx.content, message];

                return {...tx, content: newContent};
            })
        })

        setInputText('') // clear the input text
        setActiveMsgIdx(null);          // reset the inline view
    }

    function handleMessageEditClick(message, idx) {
        setInputText(message.text)
        setActiveMsgIdx(idx);           // tell container which slot to swap
    }

    // Message Event Handlers (Delete / Edit):
    function handleDeleteMessage(indexToDelete) {
        if (!currentTransmissionId) return;

        setTransmissions(prev =>
            prev.map(tx =>
                tx.id === currentTransmissionId
                    ? {
                        ...tx,
                        content: tx.content.filter((_, i) => i !== indexToDelete)
                    }
                    : tx
            )
        );

        if (activeMsgIdx === indexToDelete) {
            setActiveMsgIdx(null);
            setInputText('');
        }
    }

// DOUBLE ENTER functionality:
    const lastPressTime = useRef(0);
    const DOUBLE_PRESS_DELAY = 300;

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const now = Date.now();
            if (now - lastPressTime.current < DOUBLE_PRESS_DELAY) {
                e.preventDefault(); // prevent newline
                handleMessageSubmit(); // double Enter = submit
            }
            lastPressTime.current = now;
        }
    }

    // TODO: Where the fuck is THIS used??
    function handleFinishEditingName() {
        if (!currentTransmissionId) return;

        setTransmissions(prev =>
            prev.map(tx =>
                tx.id === currentTransmissionId
                    ? {...tx, name: draftName.trim() || "unnamed"}
                    : tx
            )
        );
        setIsEditingName(false);
    }


    return (
        <div className="transcript-container">
            <div className="transcript-header-container">
                {isEditingName ? (
                    <textarea
                        autoFocus
                        value={draftName}
                        onChange={e => setDraftName(e.target.value)}
                        onBlur={handleFinishEditingName}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleFinishEditingName();
                            }
                        }}
                        className="editor-input" // reuse existing styling
                    />
                ) : (
                    <h2 onClick={() => {
                        setDraftName(currentTransmission?.name || '');
                        setIsEditingName(true);
                    }}>
                        {currentTransmission?.name || "unnamed"}
                    </h2>
                )}

                <div className="transcript-header">
                    <div className="timestamp column">Time</div>
                    <div className="speaker column">Speaker</div>
                    <div className="snippet column">Message</div>
                </div>
            </div>

            {/*<div className="transcript-list">*/}
            {/*    {snippets.map((snippet) => (*/}
            {/*        <div className="transcript-row">*/}
            {/*            <div className="timestamp column">{snippet.audio_start_offset}</div>*/}
            {/*            <div className="speaker column">{snippet.speaker_name}</div>*/}
            {/*            <div className="snippet column">*/}
            {/*                <TranscriptSnippet key={snippet.id} snippet={snippet}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {
                !currentTransmissionId ? (
                    <p>No submission has been selected</p>
                ) : (
                    <div className="active-transmission">
                        {
                            currentTransmission.content.map( // render the list of messages within the active transmission
                                (message, mi) => ( // for every message.. then do this stuff
                                    mi === activeMsgIdx
                                        ? <EditorOutput key={`editor-${mi}`} parseTree={parseTree}/>
                                        :
                                        <Message
                                            key={mi}
                                            message={message}
                                            selectedRune={selectedRune}
                                            setSelectedRune={setSelectedRune}
                                            onDeleteMessage={() => handleDeleteMessage(mi)}
                                            onEditMessage={() => handleMessageEditClick(message, mi)}
                                        />
                                )
                            )
                        }
                    </div>
                )
            }

            <div className="editor-footer">
                <textarea
                    className="editor-input"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Type here… use [ and ] for nesting"
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleMessageSubmit}>SUBMIT</button>
            </div>
        </div>
    );
}

// function TranscriptSnippet({snippet}) {
//     const {words} = snippet;
//
//     return (
//         <div className="transcript-snippet">
//             <span className="word-list">
//                 {words.map(([word, start], i) => (
//                     <Word key={i} word={word} startTime={start}/>
//                 ))}
//             </span>
//         </div>
//     );
// }
//
// function Word({word, startTime}) {
//     return (
//         <span className="word">
//             {word}{" "}
//         </span>
//     );
// }