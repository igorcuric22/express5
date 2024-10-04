const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up multer for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle video chunk upload
app.post('/upload', upload.single('video'), (req, res) => {
  const chunk = req.file;
  const uploadDir = path.join(__dirname, 'uplo1');

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Write the chunk to a file
  const filePath = path.join(uploadDir, `chunk-${Date.now()}.webm`);
  fs.writeFile(filePath, chunk.buffer, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Chunk received successfully', filePath });
  });
});

// Serve the HTML file (for demonstration purposes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public','neda1.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
