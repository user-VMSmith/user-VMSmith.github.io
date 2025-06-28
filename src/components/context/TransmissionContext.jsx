import React, {createContext, useState, useEffect} from 'react';

export const TransmissionContext = createContext({
    snippets: []
});

export function TransmissionProvider({children}) {
    const [snippets, setSnippets] = useState([]);
    const [speakerStats, setSpeakerStats] = useState([]);
    const [activeSpeakers, setActiveSpeakers] = useState([]);


    useEffect(() => {
        fetch('/conversation-4.json')
            .then(res => {
                if (!res.ok) throw new Error('network response not ok');
                return res.json();
            })
            .then(data => {
                const snippets = data.snippets || data;
                setSnippets(snippets);

                const speakerStatsMap = {};

                for (const snip of snippets) {
                    const {speaker_id, speaker_name, duration, words} = snip;
                    if (!speakerStatsMap[speaker_id]) {
                        speakerStatsMap[speaker_id] = {
                            speaker_id,
                            speaker_name,
                            totalWords: 0,
                            totalTime: 0
                        };
                    }
                    speakerStatsMap[speaker_id].totalWords += words.length;
                    speakerStatsMap[speaker_id].totalTime += duration;
                }

                const speakerStats = Object.values(speakerStatsMap);
                setSpeakerStats(speakerStats);
            })
            .catch(err => console.error('failed to load transcript:', err));
    }, []);


    return (
        <TransmissionContext.Provider value={{
            snippets,
            speakerStats,
            activeSpeakers,
            setActiveSpeakers
        }}>
            {children}
        </TransmissionContext.Provider>
    );
}
