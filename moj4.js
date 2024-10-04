const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;
const DIR = "hhh7";

// Middleware for parsing application/json
app.use(express.json());

// Create 'hhh6' directory if it doesn't exist
async function createUploadsDirectory() {
    try {
        await fs.mkdir(path.join(__dirname, DIR));
    } catch (err) {
        if (err.code !== 'EEXIST') {
            console.error('Failed to create directory:', err);
        }
    }
}
createUploadsDirectory();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'moj4.html'));
});

app.post('/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.video) {
            return res.status(400).send('No files were uploaded.');
        }

        const videoFile = req.files.video;
        const targetPath = path.join(__dirname, DIR, videoFile.name);

        await fs.rename(videoFile.path, targetPath);
        res.send('Video chunk uploaded successfully!');
    } catch (err) {
        console.error('Error processing video chunk:', err);
        res.status(500).send('Video chunk upload failed.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const os = require('os');
// const { promisify } = require('util');

// const app = express();
// const PORT = 3000;
// const UPLOADS_DIR = path.join(__dirname, 'hhh7');

// // Promisify some fs functions for easier use with async/await
// const mkdir = promisify(fs.mkdir);
// const writeFile = promisify(fs.writeFile);

// // Create 'hhh7' directory if it doesn't exist
// async function createUploadsDirectory() {
//     try {
//         await mkdir(UPLOADS_DIR, { recursive: true });
//     } catch (err) {
//         console.error('Failed to create directory:', err);
//     }
// }
// createUploadsDirectory();

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Endpoint to serve moj4.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'moj4.html'));
// });

// // Endpoint for file upload
// app.post('/upload', async (req, res) => {
//     try {
//         if (!req.headers['content-type'].startsWith('multipart/form-data')) {
//             return res.status(400).send('Expected multipart/form-data');
//         }

//         const boundary = req.headers['content-type'].split('; ')[1].split('=')[1];
//         let chunks = [];
//         req.on('data', chunk => chunks.push(chunk));
//         req.on('end', async () => {
//             const buffer = Buffer.concat(chunks);
//             const parts = buffer.toString().split(`--${boundary}`);

//             for (let part of parts) {
//                 if (part.includes('Content-Disposition: form-data; name="video"; filename=')) {
//                     const [, header, content] = part.split('\r\n\r\n');
//                     const filenameMatch = header.match(/filename="(.+?)"/);
//                     const filename = filenameMatch[1];
//                     const filePath = path.join(UPLOADS_DIR, filename);

//                     await writeFile(filePath, content, 'binary');
//                     res.send('File uploaded successfully!');
//                 }
//             }
//         });
//     } catch (err) {
//         console.error('Error processing upload:', err);
//         res.status(500).send('File upload failed.');
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

