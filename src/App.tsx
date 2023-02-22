import React, { useRef, useState } from 'react';
import localforage from 'localforage';
import './App.css';

function createBlob(size = 1024 * 1024, fill = 255) {
    return new Uint8Array(size).fill(fill);
}

function App() {
    const stored = useRef<any>();
    const [status, setStatus] = useState('');
    const writing = useRef<boolean>(false);
    async function startWrite() {
        writing.current = true;
        setStatus('Writing');
        localforage.setDriver(localforage.INDEXEDDB);
        const blobSize = 100 * 1024 * 1024;
        let iteration = 0;
        try {
            while (writing.current) {
                iteration++;
                const blob = createBlob(blobSize);
                await localforage.setItem(String(iteration), blob);
                if (stored.current) {
                    stored.current.textContent = `${Math.floor((blobSize * iteration) / (1024 * 1024))} Mb`;
                }
            }
        } catch (e) {
            console.log(e);
            writing.current = false;
        }
    }
    function stopWrite() {
        setStatus('Halt');
        writing.current = false;
    }
    async function clearStorage() {
        await localforage.clear();
        setStatus('Storage cleared');
    }
    return (
        <div className="App">
            <button onClick={startWrite}>Start write</button>
            <button onClick={stopWrite}>Stop write</button>
            <button onClick={clearStorage}>Clear storage</button>
            <div>
                <span>Written to storage: </span>
                <span id="stored" ref={stored}></span>
            </div>
            <div id="status">Status: {status}</div>
        </div>
    );
}

export default App;
