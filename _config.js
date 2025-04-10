var config = {}

// Updated with your MongoDB Atlas credentials
config.mongoURI = {
    production: 'mongodb+srv://bellandirangu:<23ZAD107836>@moringacluster0.8k5lvfz.mongodb.net/darkroom?retryWrites=true&w=majority&appName=MoringaCluster0',
    development: 'mongodb+srv://bellandirangu:<23ZAD107836>@moringacluster0.8k5lvfz.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=MoringaCluster0',
    test: 'mongodb+srv://bellandirangu:<23ZAD107836>@moringacluster0.8k5lvfz.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=MoringaCluster0',
}

module.exports = config;
