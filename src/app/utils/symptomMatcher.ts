/**
 * Symptom to specialty mapping system
 * Maps user-entered symptoms to medical specialties
 */

// Define symptom-to-specialty mappings
const symptomToSpecialtyMap: Record<string, string[]> = {
  // Cardiology
  "chest pain": ["Cardiologist", "Interventional Cardiology"],
  "heart palpitations": ["Cardiologist", "Interventional Cardiology"],
  "shortness of breath": ["Cardiologist", "Interventional Cardiology"],
  "high blood pressure": ["Cardiologist", "Interventional Cardiology"],
  "irregular heartbeat": ["Cardiologist", "Interventional Cardiology"],
  "heart": ["Cardiologist", "Interventional Cardiology"],
  "cardiac": ["Cardiologist", "Interventional Cardiology"],
  "chest": ["Cardiologist", "Interventional Cardiology"],
  
  // Internal Medicine
  "fever": ["Internal Medicine"],
  "fatigue": ["Internal Medicine"],
  "weight loss": ["Internal Medicine"],
  "general checkup": ["Internal Medicine"],
  "diabetes": ["Internal Medicine"],
  "chronic conditions": ["Internal Medicine"],
  "chronic": ["Internal Medicine"],
  
  // Emergency Medicine
  "severe pain": ["Emergency Medicine"],
  "trauma": ["Emergency Medicine"],
  "acute symptoms": ["Emergency Medicine"],
  "emergency": ["Emergency Medicine"],
  "acute": ["Emergency Medicine"],
  
  // Dermatology
  "skin rash": ["Dermatologist"],
  "acne": ["Dermatologist"],
  "eczema": ["Dermatologist"],
  "skin cancer": ["Dermatologist"],
  "moles": ["Dermatologist"],
  "itching": ["Dermatologist"],
  "skin": ["Dermatologist"],
  "rash": ["Dermatologist"],
  
  // Neurology
  "headache": ["Neurologist"],
  "migraine": ["Neurologist"],
  "dizziness": ["Neurologist"],
  "seizure": ["Neurologist"],
  "memory loss": ["Neurologist"],
  "tremor": ["Neurologist"],
  "head": ["Neurologist"],
  
  // Orthopedics
  "joint pain": ["Orthopedic Surgeon"],
  "back pain": ["Orthopedic Surgeon"],
  "fracture": ["Orthopedic Surgeon"],
  "sports injury": ["Orthopedic Surgeon"],
  "arthritis": ["Orthopedic Surgeon"],
  "joint": ["Orthopedic Surgeon"],
  "back": ["Orthopedic Surgeon"],
  "bone": ["Orthopedic Surgeon"],
  
  // General Practice
  "cold": ["Internal Medicine"],
  "flu": ["Internal Medicine"],
  "cough": ["Internal Medicine"],
  "minor illness": ["Internal Medicine"],
  "routine care": ["Internal Medicine"],
};

/**
 * Matches symptoms to medical specialties using fuzzy/partial matching
 * @param symptoms - User-entered symptoms string (can contain multiple symptoms separated by commas or spaces)
 * @returns Array of matching specialties (unique values)
 */
export function matchSymptomsToSpecialties(symptoms: string): string[] {
  if (!symptoms || symptoms.trim() === "") {
    return [];
  }

  // Normalize input: lowercase and clean up
  const normalizedInput = symptoms.toLowerCase().trim();
  
  // Split by common separators (comma, semicolon, 'and', 'or')
  const individualSymptoms = normalizedInput
    .split(/[,;]|\s+and\s+|\s+or\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Collect all matching specialties
  const matchedSpecialties = new Set<string>();

  // For each symptom entered by user
  for (const userSymptom of individualSymptoms) {
    // Check against all defined symptom keywords
    for (const [keyword, specialties] of Object.entries(symptomToSpecialtyMap)) {
      // Fuzzy match: check if keyword is contained in user symptom or vice versa
      if (
        userSymptom.includes(keyword) || 
        keyword.includes(userSymptom)
      ) {
        specialties.forEach(specialty => matchedSpecialties.add(specialty));
      }
    }
    
    // Also check if any keyword contains the user's symptom (for partial matches)
    // This handles cases like "chest" matching "chest pain"
    for (const [keyword, specialties] of Object.entries(symptomToSpecialtyMap)) {
      const keywordWords = keyword.split(/\s+/);
      if (keywordWords.some(word => word === userSymptom || userSymptom.includes(word))) {
        specialties.forEach(specialty => matchedSpecialties.add(specialty));
      }
    }
  }

  return Array.from(matchedSpecialties);
}
