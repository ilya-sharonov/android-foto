import React, { ChangeEvent } from 'react';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import './App.css';

const images: Blob[] = [];

async function processImages(event: ChangeEvent) {
    //@ts-ignore
    const file: Blob = event.target.files[0];
    images.push(file);
}

async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64String = reader.result;
            if (base64String && typeof base64String === 'string') {
                resolve(base64String);
            } else {
                reject(base64String);
            }
        };
    });
}

async function transfer(pdf: Blob) {
    try {
        const url = 'http://localhost:2424/pdf';
        const formData = new FormData();
        formData.append('pdf', pdf, 'single.pdf');
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

async function sendPdf() {
    const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [5, 5, 5, 5],
        content: [],
    };
    for (const img of images) {
        const base64Img = await blobToBase64(img);
        docDefinition.content.push({
            image: base64Img,
            width: 585,
        });
    }
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob(blob => {
        transfer(blob);
    });
}

/* async function sendPdf() {
    try {
        let resizedImage = await reducer.toBlob(file, { max: 1200 });
        const url = '/pdf';
        const formData = new FormData();
        formData.append('pdf', resizedImage, 'single.pdf');
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
} */

function App() {
    return (
        <div className="App">
            <form>
                <input accept="image/*" id="foto-one" type="file" capture="environment" onChange={processImages} />
                <input accept="image/*" id="foto-two" type="file" capture="environment" onChange={processImages} />
                <input type="button" value="Send" onClick={sendPdf} />
            </form>
        </div>
    );
}

export default App;
