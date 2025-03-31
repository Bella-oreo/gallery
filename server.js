const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Security Middleware
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Rate Limiter Configuration
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// File Upload Configuration
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'uploads/tmp'),
  abortOnLimit: true,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 5
  },
  safeFileNames: true,
  preserveExtension: 4,
  uploadTimeout: 30000
}));

// MIME Type Validation Middleware
const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]);

app.use('/upload', (req, res, next) => {
  if (req.files) {
    const invalidFiles = Object.values(req.files).filter(
      file => !allowedMimeTypes.has(file.mimetype)
    );
    
    if (invalidFiles.length > 0) {
      return res.status(415).json({
        error: `Unsupported file types: ${invalidFiles.map(f => f.name).join(', ')}`
      });
    }
  }
  next();
});

// Upload Endpoint
app.post('/upload', uploadLimiter, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files selected' });
    }

    const fileIds = [];
    const uploadDir = path.join(__dirname, 'uploads');
    
    // Create upload directory if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process files in parallel
    await Promise.all(
      Object.values(req.files).map(async (file) => {
        const fileId = uuidv4();
        const ext = path.extname(file.name);
        const newFileName = `${fileId}${ext}`;
        const filePath = path.join(uploadDir, newFileName);

        await file.mv(filePath);
        fileIds.push({
          id: fileId,
          originalName: file.name,
          size: file.size,
          mimeType: file.mimetype
        });

        // Security log
        console.log(`[${new Date().toISOString()}] Uploaded: ${file.name} => ${newFileName}`);
      })
    );

    res.json({ 
      success: true,
      message: `${fileIds.length} files uploaded successfully`,
      files: fileIds
    });

  } catch (error) {
    console.error(`Upload Error: ${error.message}`);
    res.status(500).json({
      error: 'File processing failed',
      details: error.message
    });
  }
});

// Home Route to Render Upload Form
app.get('/', (req, res) => {
  const imageDir = path.join(__dirname, 'uploads');
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to read upload directory');
    }

    const images = files.map(file => ({
      name: file,
      path: path.join('uploads', file)
    }));

    res.render('index', { images, msg: '' });
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Global Error: ${err.stack}`);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Server Initialization
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
