// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auctionapp').then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((err) =>{
    console.log("Error connecting to MongoDB");
    console.log(err);
});

// To prevent some deprecation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
