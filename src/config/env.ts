import dotenv from "dotenv";
 
dotenv.config();
 
interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
}
 
export const env: EnvConfig = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};
 
// Optional: Validate required env variables
if (!env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env file");
}
 
if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env file");
}
 