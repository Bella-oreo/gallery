const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const photoRouter = require('./routes/photos'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection Improvements
async function connectDB(env = 'development') {
    try {
        await mongoose.connect(config.mongoURI[env], {
            useNewUrlParser: true,     // Will remove this in next step
            useUnifiedTopology: true   // Will remove this in next step
        });
        console.log(`Connected to MongoDB (${env} environment)`);
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

// Middleware
app.use(express.json());
app.use('/photos', photoRouter); // Add this line

// Server Control
let server;

function startServer() {
    server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
    return server;
}

async function gracefulShutdown() {
    console.log('\nClosing connections...');
    await mongoose.disconnect();
    server.close(() => {
        console.log('Server terminated');
        process.exit(0);
    });
}

// For testing access
module.exports = {
    app,
    connectDB,
    startServer,
    gracefulShutdown
};

// Start in development mode
if (process.env.NODE_ENV !== 'test') {
    connectDB()
        .then(startServer)
        .catch(err => {
            console.error('Failed to start:', err);
            process.exit(1);
        });

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
}

