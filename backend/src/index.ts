import express, { Request, Response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// ADD YOUR GEMINI API KEYH HERE
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

app.post("/chat", async (req: Request, res: Response) => {
  const { message, history } = req.body as {
    message: string;
    history: ChatMessage[];
  };

  try {
    let savedIdea = null;
    let aiMessage = "";

    const saveCommandRegex = /^save idea:\s*(.+)/i;
    const match = message.match(saveCommandRegex);

    if (match) {
      savedIdea = match[1].trim();
      aiMessage = `I've saved the following idea: "${savedIdea}"`;
    } else {
      const geminiHistory = history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: geminiHistory,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      aiMessage = response.text();
    }

    res.json({ message: aiMessage, savedIdea });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
