import './Layout.css'

import {useContext, useEffect, useState} from 'react';
import {TransmissionContext} from './context/TransmissionContext.jsx';
import Talk from './Talk/Talk.jsx';
import Transmissions from "./Transmissions/Transmissions.jsx";
import Powerlanguage from "./Powerlanguage/Powerlanguage.jsx";
import {useLocalStorage} from "../hooks/useLocalStorage.jsx";
import FloatingTooltip from "./FloatingTooltip.jsx";
import NewTransmissionModal from "./Modals/NewTransmissionModal.jsx";

export default function Layout() {
    const {snippets, activeSpeakers} = useContext(TransmissionContext);
    const visibleSnippets = activeSpeakers.length === 0
        ? snippets
        : snippets.filter(snip => activeSpeakers.includes(snip.speaker_id));

    // document.dispatchEvent(new CustomEvent("selectionChanged"));

    // TRANSMISSION STATE
    // Persist the list of transmissions (array of { id, metadata, content })
    const [transmissions, setTransmissions] = useLocalStorage('transmissions', [])
    const [currentTransmissionId, setCurrentTransmissionId] = useState(null)
    const currentTransmission = transmissions.find(function (tx) {
        return tx.id === currentTransmissionId;
    });
    const [lastOpenedTransmissionId, setLastOpenedTransmissionId] = useState(null)

    // Modals
    // -------> Selection Tooltip
    const [isSelectionModalOpen, setSelectionModalOpen] = useState(false);
    const [tooltipAnchor, setTooltipAnchor] = useState(null);
    const [selectedRune, setSelectedRune] = useState(null);

    useEffect(() => {
        if (!selectedRune) {
            setSelectionModalOpen(false);
            setTooltipAnchor(null);
            return;
        }

        const selected = document.querySelector('.capsule.selected, .word.selected');
        if (selected) {
            const rect = selected.getBoundingClientRect();
            setTooltipAnchor(rect);
            setSelectionModalOpen(true);
        }
    }, [selectedRune]);


    const handleSelectionModalClose = () => {
        setSelectionModalOpen(false);
        setTooltipAnchor(null);
        const selected = document.querySelector('.selected');
        if (selected) selected.classList.remove('selected');
        setSelectedRune(null);
    };

    // useEffect(() => {
    //     function handleSelectionChanged() {
    //         const selected = document.querySelector('.selected');
    //         if (selected) {
    //             const rect = selected.getBoundingClientRect();
    //             setTooltipAnchor(rect);
    //             setSelectionModalOpen(true);
    //         } else {
    //             setTooltipAnchor(null);
    //             setSelectionModalOpen(false);
    //         }
    //     }
    //
    //     document.addEventListener("selectionChanged", handleSelectionChanged);
    //     return () => document.removeEventListener("selectionChanged", handleSelectionChanged);
    // }, []);
    //
    // const handleSelectionModalClose = () => {
    //     setSelectionModalOpen(false);
    //     setTooltipAnchor(null);
    //     const selected = document.querySelector('.selected');
    //     if (selected) selected.classList.remove('selected');
    // };


    // -------> New Transmission modal
    const [isNewTransmissionModalOpen, setNewTransmissionModalOpen] = useState(false);
    const [newTransmissionName, setNewTransmissionName] = useState('');

    const handleNewTransmissionModalOpen = () => {
        setNewTransmissionModalOpen(true);
    };

    const handleNewTransmissionModalClose = () => {
        setNewTransmissionModalOpen(false);
    };

    // Transmission Event Handlers (Create and Load)
    function handleNewTransmission() {
        const newId =
            Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2)

        const newTransmission = {
            id: newId,
            metadata: {createdAt: new Date().toISOString()},
            name: newTransmissionName?.trim() || "unnamed",
            powerlanguage: [],
            content: [
                {
                    "submitTime": "2025-06-20T01:53:38.857Z",
                    "userName": "me",
                    "text": "This is a [deeply [nested [item] but it need] some more real] examples doesn't it..",
                    "tree": [
                        [
                            "This is a ",
                            [
                                "deeply ",
                                [
                                    "nested ",
                                    [
                                        "item"
                                    ],
                                    " but it need"
                                ],
                                " some more real"
                            ],
                            " examples doesn't it.."
                        ]
                    ]
                }
            ]
        }
        // append to saved list
        setTransmissions(function (prev) {
            return prev.concat(newTransmission)
        })
        setNewTransmissionName(''); // optional: clear modal input
        // select it
        setCurrentTransmissionId(newId)
        handleNewTransmissionModalClose()
    }

    function handleLoadTransmission(txId) {
        setCurrentTransmissionId(txId);
    }

    function handleDeleteTransmission(idToDelete) {
        setTransmissions(prev => {
            const updated = prev.filter(tx => tx.id !== idToDelete);

            // If the one being deleted is the current transmission, clear it
            if (currentTransmissionId === idToDelete) {
                setCurrentTransmissionId(null);
            }

            return updated;
        });
    }


    // Powerlanguage STATE:
    const powerlanguageData = Array.isArray(currentTransmission?.powerlanguage)
        ? currentTransmission.powerlanguage
        : [];


    function updatePowerlanguage(updaterFn) {
        setTransmissions(prev =>
            prev.map(tx => {
                if (tx.id !== currentTransmissionId) return tx;

                const newPowerlanguage = updaterFn(
                    Array.isArray(tx.powerlanguage) ? tx.powerlanguage : []
                );

                return {
                    ...tx,
                    powerlanguage: newPowerlanguage
                };
            })
        );
    }

    function handleDeletePearl(pearlIdToDelete) {
        setTransmissions(prev => prev.map(tx => {
            if (tx.id !== currentTransmissionId) return tx;
            return {
                ...tx,
                powerlanguage: tx.powerlanguage.filter(p => p.pearl_id !== pearlIdToDelete)
            };
        }));
    }


    return (
        <>
            <div className="layout">
                <NewTransmissionModal isOpen={isNewTransmissionModalOpen}
                                      handleClose={() => setNewTransmissionModalOpen(false)}>
                    <textarea
                        placeholder="NAME your new transmission here… "
                        value={newTransmissionName}
                        onChange={e => setNewTransmissionName(e.target.value)}
                    />
                    <button onClick={handleNewTransmission}>Done</button>
                </NewTransmissionModal>
                <FloatingTooltip
                    updatePowerlanguage={updatePowerlanguage}
                    isOpen={isSelectionModalOpen}
                    handleClose={handleSelectionModalClose}
                    anchorRect={tooltipAnchor}
                    selectedRune={selectedRune}
                />
                <Transmissions transmissions={transmissions} currentTransmissionId={currentTransmissionId}
                               handleNewTransmissionModalOpen={handleNewTransmissionModalOpen}
                               handleLoadTransmission={handleLoadTransmission}
                               handleDeleteTransmission={handleDeleteTransmission}
                               handleSelectionModalClose={handleSelectionModalClose}
                />
                <Talk
                    snippets={visibleSnippets}
                    currentTransmission={currentTransmission}
                    currentTransmissionId={currentTransmissionId}
                    setTransmissions={setTransmissions}
                    selectedRune={selectedRune}
                    setSelectedRune={setSelectedRune}
                />
                <Powerlanguage powerlanguageData={powerlanguageData} updatePowerlanguage={updatePowerlanguage} handleDeletePearl={handleDeletePearl}/>
            </div>
        </>
    );
}