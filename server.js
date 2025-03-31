const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database Connection
async function connectDB() {
    try {
        await mongoose.connect(config.mongoURI.development, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Dark Room App');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
