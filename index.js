// Import dependencies using ES6 module syntax
import express from "express";
import dotenv from "dotenv";
import weatherRouter from "./chatbot.mjs"; // Import the weatherRouter module

// Initialize dotenv for environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 3000;

// Create an Express app
const app = express();

// Use the weatherRouter for handling routes
app.use("/", weatherRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
