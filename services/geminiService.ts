import { GoogleGenAI } from "@google/genai";
import { Place, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateIcebreaker = async (
  place: Place,
  partner: User
): Promise<{ text: string; error?: boolean }> => {
  const fallback = `Hey! What do you think about ${place.name}?`;

  try {
    if (!process.env.API_KEY) {
      console.warn('Gemini API key not configured');
      return { text: fallback, error: true };
    }

    const model = 'gemini-2.5-flash';
    const prompt = `Generate a short, flirty or fun icebreaker message to send to ${partner.name} about meeting at "${place.name}" (${place.type}). Keep it under 150 characters. Casual tone.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return { text: response.text?.trim() || fallback };
  } catch (error) {
    console.error('Gemini Error:', error);
    return { text: fallback, error: true };
  }
};

export const chatWithBot = async (
  history: { role: string; text: string }[],
  userMessage: string
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      console.warn('Gemini API key not configured');
      return "I'm having trouble connecting right now. Let's focus on the date!";
    }

    const model = 'gemini-2.5-flash';
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction:
          'You are a helpful AI assistant in a dating app called DateSync. You help users plan their date. Be concise, friendly, and helpful. Do not be overly formal.',
      },
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || '...';
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    return "I'm having trouble connecting right now. Let's focus on the date!";
  }
};

export const searchPlacesWithGoogleMaps = async (query: string) => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: `Find places matching this query in Djibouti: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    return response.text;
  } catch (error) {
    console.error('Gemini Maps Agent Error:', error);
    return null;
  }
};

export const getPlaceDetails = async (placeName: string) => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: `Tell me about ${placeName} in Djibouti. What is the vibe, rating, and what do they serve?`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  } catch (error) {
    return null;
  }
};
