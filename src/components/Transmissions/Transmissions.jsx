import './Transmissions.css'

// import {useContext, useTransition} from 'react';
// import {TransmissionContext} from '../context/TransmissionContext.jsx';

export default function Transmissions({
                                          transmissions,
                                          currentTransmissionId,
                                          handleNewTransmissionModalOpen,
                                          handleLoadTransmission,
                                          handleDeleteTransmission,
                                          handleSelectionModalClose
                                      }) {
    // const {speakerStats, activeSpeakers, setActiveSpeakers} = useContext(TransmissionContext);
    // const [isPending, startTransition] = useTransition();
    //
    // function toggleTransmission(speaker_id) {
    //     startTransition(() => {
    //         setActiveSpeakers(prev =>
    //             prev.includes(speaker_id)
    //                 ? prev.filter(id => id !== speaker_id)
    //                 : [...prev, speaker_id]
    //         );
    //     });
    // }

    return (
        <div className="transmissions-sidebar">

            {/*<div className="transmissions-container">*/}
            {/*    <h2>Transmissions{isPending && '⏳'}</h2>*/}
            {/*    <ul>*/}
            {/*        {speakerStats.map(speaker => (*/}
            {/*            <li key={speaker.speaker_id}>*/}
            {/*                <div className="transmission-item">*/}
            {/*                    <label>*/}
            {/*                        <input type="checkbox"*/}
            {/*                               checked={activeSpeakers.includes(speaker.speaker_id)}*/}
            {/*                               onChange={() => toggleTransmission(speaker.speaker_id)}*/}
            {/*                        />*/}
            {/*                        {' '}*/}
            {/*                    </label>*/}
            {/*                    <div className="transmission-info">*/}
            {/*                        <strong>{speaker.speaker_name}</strong>*/}
            {/*                        {speaker.totalWords} words, {speaker.totalTime.toFixed(1)} sec*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}

            <div className="transmissions-container">
                <div className="transmissions-header">
                    <h2>Transmissions</h2>
                    <button
                        className="new-transmission-button"
                        onClick={handleNewTransmissionModalOpen}>
                        +
                    </button>
                </div>
                <ul>
                    {transmissions.map(function (tx) {
                        return (
                            <li key={tx.id}>
                                <div className="transmission-item"
                                     onClick={function () {
                                         handleSelectionModalClose()
                                         handleLoadTransmission(tx.id)
                                     }}
                                     style={{
                                         backgroundColor:
                                             tx.id === currentTransmissionId ? 'rgba(0, 0, 0, 0.05)' : 'transparent'
                                     }}>
                                    <label>
                                        <input type="checkbox"
                                               checked={tx.id === currentTransmissionId}
                                               readOnly
                                        />
                                        {' '}
                                    </label>
                                    <div className="transmission-info">
                                        <strong>{tx.name?.trim() || "unnamed"}</strong>
                                        {Math.floor(Math.random() * 15) + 1} runes, {Math.floor(Math.random() * 50) + 1} messages
                                    </div>
                                    <button
                                        className="delete-transmission-button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent triggering load on click
                                            handleDeleteTransmission(tx.id);
                                        }}
                                        title="Delete"
                                    >
                                        ×
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="search-container">
                <h2>Text Search</h2>
                <form>
                    <input type="text" placeholder="Search..."/>
                    <label>
                        <input type="checkbox"/>
                        {' '}
                        Only show matching text
                    </label>
                </form>
            </div>

        </div>
    );
}
