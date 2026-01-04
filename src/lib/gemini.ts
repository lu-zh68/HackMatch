import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini() {
  if (!API_KEY) {
    console.warn('Gemini API key not found. Matching will use fallback algorithm.');
    return null;
  }
  genAI = new GoogleGenerativeAI(API_KEY);
  return genAI;
}

export function getGeminiModel() {
  if (!genAI) {
    initializeGemini();
  }
  return genAI?.getGenerativeModel({ model: 'gemini-pro' });
}
