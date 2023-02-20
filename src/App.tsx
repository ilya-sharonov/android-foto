import React, { ChangeEvent } from 'react';

import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import './App.css';

const createWorker = createWorkerFactory(() => import('./worker'));

function App() {
    const worker = useWorker(createWorker);

    async function processImages(event: ChangeEvent) {
        //@ts-ignore
        const file = event.target.files[0];
        await worker.processImage(file);
    }
    return (
        <div className="App">
            <form action="/foto" method="post" encType="multipart/form-data">
                <input
                    accept="image/*"
                    id="icon-button-file"
                    name="foto"
                    type="file"
                    capture="environment"
                    onChange={processImages}
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default App;
