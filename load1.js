const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DIR="upload12";

// Serve static files (optional, if you have other static content to serve)
app.use(express.static(path.join(__dirname, 'public')));


// Parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'load1.html'));
});

// Endpoint to serve video chunks
app.get('/download', (req, res) => {
    const { name, chunk } = req.query;
    const fileName = `${name}_${chunk}.webm`; // Adjust the file name pattern as per your server's file naming convention

    const filePath = path.join(__dirname, DIR , fileName); // Adjust 'videos' to your actual directory where video chunks are stored

    console.log(filePath);
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', err);
            res.status(404).send('File not found');
            return;
        }

        // Stream the file to client
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('open', () => {
            res.set('Content-Type', 'video/webm'); // Adjust the MIME type as per your video format
            fileStream.pipe(res);
        });
        fileStream.on('error', (error) => {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
