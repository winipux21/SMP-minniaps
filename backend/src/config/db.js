/*
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Подключение к MongoDB Atlas с переданным URI
    const mongoURI =
      "mongodb+srv://eblovpizde:ILein5DofrBxWX8O@phones.xh841.mongodb.net/";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    process.exit(1); // Завершаем процесс в случае ошибки
  }
};

module.exports = connectDB;
*/

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
