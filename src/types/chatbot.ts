import { Doctor } from "./doctor";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
  doctors?: Doctor[];
}

export interface ChatResponse {
  message: string;
  specialty?: string;
  doctors?: Doctor[];
  suggestions?: string[];
}
