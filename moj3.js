const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'hhh1/' });

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'moj3.html'));
});


app.post('/upload', upload.single('video'), (req, res) => {
    handleFileUpload(req.file)
        .then(() => {
            res.send('Video chunk uploaded successfully!');
        })
        .catch((err) => {
            console.error('Error processing video chunk:', err);
            res.status(500).send('Video chunk upload failed.');
        });
});

function handleFileUpload(file) {
    return new Promise((resolve, reject) => {
        // Example processing: rename the file
        const targetPath = path.join(__dirname, 'hhh1', file.originalname);

        fs.rename(file.path, targetPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
