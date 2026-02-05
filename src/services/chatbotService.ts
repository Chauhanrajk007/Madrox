import { Doctor } from "@/types/doctor";
import { ChatMessage, ChatResponse } from "@/types/chatbot";
import { getDoctorsBySpecialty, getTopRatedDoctors } from "./doctorService";

// Symptom-to-specialty mapping
const symptomKeywords: Record<string, string[]> = {
  Cardiologist: [
    "heart",
    "chest pain",
    "palpitations",
    "blood pressure",
    "cardiac",
    "angina",
    "shortness of breath",
    "heartbeat",
    "cardiovascular",
  ],
  Dermatologist: [
    "skin",
    "rash",
    "acne",
    "eczema",
    "psoriasis",
    "moles",
    "itching",
    "hives",
    "dermatitis",
    "sunburn",
  ],
  Orthopedic: [
    "bone",
    "joint",
    "fracture",
    "back pain",
    "knee pain",
    "arthritis",
    "sports injury",
    "sprain",
    "muscle pain",
    "neck pain",
  ],
  Neurologist: [
    "headache",
    "migraine",
    "seizure",
    "epilepsy",
    "dizziness",
    "numbness",
    "memory loss",
    "tremor",
    "stroke",
    "vertigo",
  ],
  Pediatrician: [
    "child",
    "baby",
    "infant",
    "vaccination",
    "growth",
    "development",
    "fever in child",
    "kid",
    "toddler",
  ],
  Psychiatrist: [
    "anxiety",
    "depression",
    "stress",
    "mental health",
    "panic",
    "insomnia",
    "mood",
    "trauma",
    "ptsd",
    "therapy",
  ],
  Gynecologist: [
    "pregnancy",
    "menstrual",
    "pelvic pain",
    "reproductive",
    "women's health",
    "fertility",
    "gynecology",
    "prenatal",
  ],
  Ophthalmologist: [
    "eye",
    "vision",
    "blurry vision",
    "eye pain",
    "cataract",
    "glaucoma",
    "red eye",
    "sight",
    "blind",
  ],
  ENT: [
    "ear",
    "nose",
    "throat",
    "hearing",
    "sinus",
    "tonsil",
    "vertigo",
    "voice",
    "tinnitus",
    "congestion",
  ],
  "General Physician": [
    "fever",
    "cold",
    "cough",
    "fatigue",
    "general checkup",
    "flu",
    "infection",
    "tired",
    "weak",
  ],
  "Emergency Medicine": [
    "severe pain",
    "accident",
    "trauma",
    "urgent",
    "emergency",
    "bleeding",
    "unconscious",
    "critical",
  ],
};

/**
 * Analyze symptoms and return matching specialty
 */
export const analyzeSymptoms = (input: string): string => {
  const lowerInput = input.toLowerCase();
  const matches: { specialty: string; score: number }[] = [];

  // Check each specialty's keywords
  Object.entries(symptomKeywords).forEach(([specialty, keywords]) => {
    let score = 0;
    keywords.forEach((keyword) => {
      if (lowerInput.includes(keyword.toLowerCase())) {
        score++;
      }
    });
    if (score > 0) {
      matches.push({ specialty, score });
    }
  });

  // Sort by score and return highest match
  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score);
    return matches[0].specialty;
  }

  // Fallback to General Physician
  return "General Physician";
};

/**
 * Generate bot response with doctors
 */
export const generateChatResponse = (userInput: string): ChatResponse => {
  const specialty = analyzeSymptoms(userInput);
  const doctors = getDoctorsBySpecialty(specialty);

  // Limit to top 3 doctors by rating
  const topDoctors = doctors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Generate friendly message
  let message = "";
  
  if (specialty === "General Physician" && doctors.length === 0) {
    // Fallback case - show top rated doctors
    const fallbackDoctors = getTopRatedDoctors(3);
    message = "I understand you're not feeling well. I recommend consulting with a General Physician. Here are some highly-rated doctors who can help:";
    return {
      message,
      specialty,
      doctors: fallbackDoctors,
      suggestions: ["Book Appointment", "See More Doctors", "Start Over"],
    };
  }

  if (topDoctors.length > 0) {
    message = `Based on your symptoms, I recommend consulting a ${specialty}. Here are the top ${topDoctors.length} ${specialty.toLowerCase()}${topDoctors.length > 1 ? "s" : ""} near you:`;
  } else {
    message = `I recommend seeing a ${specialty} for your symptoms. Unfortunately, I couldn't find any available right now. Please try again or contact support.`;
  }

  return {
    message,
    specialty,
    doctors: topDoctors,
    suggestions: ["Book Appointment", "See More Doctors", "Start Over"],
  };
};

/**
 * Generate welcome message
 */
export const getWelcomeMessage = (): ChatMessage => {
  return {
    id: `welcome-${Date.now()}`,
    sender: "bot",
    content:
      "👋 Hello! I'm your AI health assistant. Tell me about your symptoms, and I'll help you find the right doctor.",
    timestamp: new Date(),
  };
};

/**
 * Create a chat message
 */
export const createChatMessage = (
  sender: "user" | "bot",
  content: string,
  doctors?: Doctor[]
): ChatMessage => {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sender,
    content,
    timestamp: new Date(),
    doctors,
  };
};
