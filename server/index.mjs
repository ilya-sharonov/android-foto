import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { internalIpV4Sync } from 'internal-ip';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());

app.use(express.static('build'));

app.post('/foto', upload.single('scaled'), function (req, res, next) {
    console.log(`Got file: ${Boolean(req.file)}`);
    res.status(200).send('ok');
});

/* app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
});

const cpUpload = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 },
]);
app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
}); */

app.listen(2424, '0.0.0.0', () => {
    console.log(`Foto srv listening on ${internalIpV4Sync()}:2424`);
});
