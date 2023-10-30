// Import dependencies using ES6 module syntax
import express from "express";
import dotenv from "dotenv";
import weatherRouter from "./chatbot.mjs"; // Import the weatherRouter module
import cors from "cors"
// Initialize dotenv for environment variables
const app = express()
app.use(express.json())
dotenv.config();
app.use(cors());
// Define the port
const PORT = process.env.PORT || 3000;


// Use the weatherRouter for handling routes
app.use("/", weatherRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
