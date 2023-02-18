import React, { ChangeEvent } from 'react';
import ImageBlobReduce from 'image-blob-reduce';
import './App.css';

const reducer = new ImageBlobReduce();

async function processImages(event: ChangeEvent) {
    //@ts-ignore
    const file = event.target.files[0];
    try {
        let resizedImage = await reducer.toBlob(file, { max: 1200 });
        const url = 'http://localhost:2424/foto';
        const formData = new FormData();
        formData.append('scaled', resizedImage, 'scaled.jpg');
        const options = {
            method: 'POST',
            body: formData,
        };

        let result = await fetch(url, options);

        // TODO: Handle the result
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function App() {
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
