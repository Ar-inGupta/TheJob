const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://TheJob:VOJdsl13hnHH3McP@cluster0.ahhc1eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
