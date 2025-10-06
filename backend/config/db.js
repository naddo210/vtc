const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Default to local MongoDB if no URI is provided in .env
    const defaultUri = 'mongodb://localhost:27017/vtc_classes';
    
    // Use memory server for testing if MongoDB is not available
    let conn;
    try {
      conn = await mongoose.connect(process.env.MONGO_URI || defaultUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (dbError) {
      console.error(`MongoDB Connection Error: ${dbError.message}`);
      console.log('Using in-memory database for testing as MongoDB connection failed');
      // Create mock data in memory
      global.mockDB = {
        resources: [],
        offers: [],
        users: [{ _id: '1', name: 'Admin', email: 'admin@vtc.com', password: '$2a$10$yjCgT/uuHSxKqUCTGGJhG.q5YrJWdnG2XtQh1qVT.1X0vz5TpjZ6W', role: 'admin' }]
      };
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Using in-memory database for testing');
    // Create mock data in memory
    global.mockDB = {
      resources: [],
      offers: [],
      users: [{ _id: '1', name: 'Admin', email: 'admin@vtc.com', password: '$2a$10$yjCgT/uuHSxKqUCTGGJhG.q5YrJWdnG2XtQh1qVT.1X0vz5TpjZ6W', role: 'admin' }]
    };
  }
};

module.exports = connectDB;