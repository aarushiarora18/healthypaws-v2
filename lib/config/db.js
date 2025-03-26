import mongoose from "mongoose"

const connectDB = async () => {
  try {
    // MongoDB connection options
    const options = {
      useNewUrlParser: true, // Use the new URL string parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
      connectTimeoutMS: 10000, // Timeout after 10 seconds if unable to connect
    }

    // Connect to MongoDB - Replace with your own connection string
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://your-mongodb-connection-string", options)

    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
  }
}

export default connectDB

