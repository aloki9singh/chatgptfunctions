// Import dependencies using ES6 module syntax
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { createChat } from "completions";

// Initialize dotenv for environment variables
dotenv.config();

// Create an Express app
const app = express();

// Create an Express router
const weatherRouter = express.Router();

// Weather API configuration

var Key = "1de760b18d6d92f69cb6972a0b7c288f";
const chat = createChat({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-3.5-turbo-0613",
  functions: [
    {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
        required: ["location"],
      },
      function: async ({ location }) => {
        let res_single = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Key}&units=metric&sys=unix`
        );
        let data = await res_single.json();
        return {
          location: data.name, //weather API
          temperature: data.main.temp, //weather API
          unit: "celsius",
        };
      },
    },
  ],
  functionCall: "none",
});

// Define a route for handling the weather bot
weatherRouter.post("/weatherbot", async (req, res) => {
  const {userMessage }= req.body;

  try {
    const response = await chat.sendMessage(userMessage,{
      //this function only runs
      functionCall:{
        name:"get_current_weather"
      }
    });
    console.log(response.content);
    const result = response.content;
    res.json({ result });
  } catch (error) {
    const message =
      "It seems that the answer to this question isn't available. Could you please try rephrasing it?";
    res.json({ message, error });
  }
});

// Export the weatherRouter as the default export
export default weatherRouter;
