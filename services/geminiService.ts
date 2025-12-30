
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getAnimalExpertAdvice = async (userPrompt: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert livestock and pet consultant for Animal Mandi. Provide concise, professional advice on animal health, breed identification, and market prices in South Asia.",
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI expert is currently offline. Please try again later.";
  }
};

export const analyzeAnimalImage = async (base64Image: string) => {
  const ai = getAIClient();
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };
    const textPart = {
      text: "Identify this animal breed, estimate its weight and age if possible, and suggest a fair market price range in Pakistan/India region."
    };
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, textPart] },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Could not analyze the image.";
  }
};
