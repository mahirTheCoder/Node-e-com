const mongoose = require("mongoose");

const dbConfig = async () => {
 const url = process.env.MONGODB_URL;
 if(!url) {
  console.error("MONGODB_URL is not defined in environment variables"); }
};


try{
  await mongoose.connect(url);
  console.log("Connected to MongoDB successfully");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

module.exports = dbConfig