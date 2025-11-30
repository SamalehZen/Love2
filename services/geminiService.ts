
import { GoogleGenAI } from "@google/genai";
import { Place, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateIcebreaker = async (place: Place, partner: User): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a short, flirty or fun icebreaker message to send to ${partner.name} about meeting at "${place.name}" (${place.type}). Keep it under 150 characters. Casual tone.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text?.trim() || `Hey! What do you think about ${place.name}?`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Hey! What do you think about ${place.name}?`;
  }
};

export const chatWithBot = async (history: {role: string, text: string}[], userMessage: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const chat = ai.chats.create({
            model,
            config: {
                systemInstruction: "You are a helpful AI assistant in a dating app called DateSync. You help users plan their date. Be concise, friendly, and helpful. Do not be overly formal."
            },
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            }))
        });

        const result = await chat.sendMessage({ message: userMessage });
        return result.text || "...";
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "I'm having trouble connecting right now. Let's focus on the date!";
    }
}

/**
 * Gemini Agent for Real-time Google Maps Data
 * Uses the googleMaps tool to search for places, routes, or info.
 */
export const searchPlacesWithGoogleMaps = async (query: string) => {
  try {
    const model = 'gemini-2.5-flash';
    // This uses the Google Maps Grounding tool
    const response = await ai.models.generateContent({
      model,
      contents: `Find places matching this query in Djibouti: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });

    // In a real scenario, we would parse response.candidates[0].groundingMetadata.groundingChunks
    // to get the actual map links and place IDs.
    // For this demo, we return the text description which often includes the grounded data.
    return response.text;
  } catch (error) {
    console.error("Gemini Maps Agent Error:", error);
    return null;
  }
}

export const getPlaceDetails = async (placeName: string) => {
    try {
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: `Tell me about ${placeName} in Djibouti. What is the vibe, rating, and what do they serve?`,
            config: {
                tools: [{ googleSearch: {} }] // Use Search for detailed reviews/menus if Maps isn't enough
            }
        });
        return response.text;
    } catch (error) {
        return null;
    }
}
