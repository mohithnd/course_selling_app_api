const mongoose = require("mongoose");

async function connectToDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("Successfully Connected To MongoDB Database");
  } catch (err) {
    console.log("Error Connecting To Database");
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  connectToDB,
};
