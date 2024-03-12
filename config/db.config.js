const mongoose = require("mongoose");
const mongooseConnectDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(process.env.MONGO_URL,);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
};

module.exports = mongooseConnectDB;
