const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connecting to the database using async/await
let mongodb_url = config.mongoURI?.development || 'mongodb://localhost:27017/';
let dbName = 'darkroom';

async function connectDB() {
    try {
        await mongoose.connect(`${mongodb_url}${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the application on connection failure
    }
}

connectDB();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/image', image);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Dark Room App');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

