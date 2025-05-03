import dotenv from "dotenv";

dotenv.config();

export const GROQ_API_KEY = process.env.GROQ_API_KEY;
export const clientId = process.env.clientId;
export const clientsecret = process.env.clientsecret;
export const PORT = process.env.PORT;