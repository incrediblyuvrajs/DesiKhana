const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Connected to the database...");
  } catch (error) {
    console.log(
      "Sorry! Could not connect with the database. Please check your connection string."
    );
  }
};

module.exports = connectDb;
