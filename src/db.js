const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDB;
