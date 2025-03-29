var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://bellandirangu:23ZAD107836@moringacluster0.8k5lvfz.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://bellandirangu:23ZAD107836@moringacluster0.8k5lvfz.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://bellandirangu:23ZAD107836@moringacluster0.8k5lvfz.mongodb.net/darkroom-test?retryWrites=true&w=majority'
}

module.exports = config;

