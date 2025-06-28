import React, {Suspense} from 'react';
import {TransmissionProvider} from './components/context/TransmissionContext.jsx';
// import { AudioProvider } from './components/context/AudioContext';
import Layout from './components/Layout';

/**
 * Root application component.
 * Wraps the app in transcript + audio context providers
 * and uses Suspense for data loading.
 */

export default function App() {
    return (
        <TransmissionProvider>
            <Suspense fallback={<div>Loading conversation...</div>}>
                <Layout/>
            </Suspense>
        </TransmissionProvider>
    )
}