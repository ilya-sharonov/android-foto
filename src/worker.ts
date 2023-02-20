import ImageBlobReduce from 'image-blob-reduce';

const reducer = new ImageBlobReduce();

export async function processImage(file: File) {
    try {
        let resizedImage = await reducer.toBlob(file, { max: 1200 });
        console.log(resizedImage);
        const url = '/foto';
        const formData = new FormData();
        formData.append('scaled', resizedImage, 'scaled.jpg');
        const options = {
            method: 'POST',
            body: formData,
        };

        let result = await fetch(url, options);

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
