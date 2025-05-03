import Groq from "groq-sdk";
import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import { Baseprompt, prompt } from "./prompt";
import { basePrompt } from "./Baseprompt";
import { chatHandler } from "./controllers/chat";
import { getAccessToken } from "./controllers/getAccessToken";
import { getRepo } from "./controllers/getRepo";
import { GROQ_API_KEY, PORT } from "./config/config";
const app = express ()
dotenv.config()
app.use(express.json())
app.use(cors())


const groq = new Groq({ apiKey: GROQ_API_KEY });

interface GroqCompletionResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}

export async function getGroqChatCompletion(messages:string): Promise<GroqCompletionResponse> {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role:"user",
          content: [Baseprompt,basePrompt].join("\n\n"),
        },
        {
          role: "system",
          content: prompt(),
        },
        {
          role: "user",
          content: messages,
        }
      ],
      
      model: "deepseek-r1-distill-llama-70b",
      max_tokens:10000,
      
    }).asResponse();
    
    const data = await response.json();


    return data as GroqCompletionResponse;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}


app.post ("/chat",chatHandler);

app.get('/getaccesstoken',getAccessToken);

app.get("/getrepo",getRepo);

app.listen(PORT,()=>{
  console.log("Server is running on port 3000")
})