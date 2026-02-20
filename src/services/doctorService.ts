import { Doctor, DoctorFilter } from "@/types/doctor";

// Mock doctor data - matches DoctorSearch.tsx
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    degree: "MD, Ph.D. Cardiology",
    experience: "15 Years",
    about: "Dr. Johnson is a leading expert in interventional cardiology with a focus on structural heart disease. She pioneers minimally invasive techniques and is dedicated to patient-centered care.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    distance: 1.2,
    skills: ["Chest Pain", "Diagnostics", "ECG", "Angioplasty"],
    trustScore: 98,
    verified: true,
    rating: 4.9,
    reviews: 124,
    nextAvailable: "Tomorrow at 10:00 AM",
    languages: ["English", "Spanish"],
    insurance: ["BlueCross", "Aetna", "Medicare"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    degree: "MD, FACC",
    experience: "12 Years",
    about: "Expert in preventive cardiology and heart rhythm disorders. Dr. Chen focuses on lifestyle modifications combined with advanced medical therapies to optimize heart health.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    distance: 2.5,
    skills: ["Heart Disease", "Preventive Care", "Arrhythmia"],
    trustScore: 94,
    verified: true,
    rating: 4.8,
    reviews: 98,
    nextAvailable: "Today at 2:30 PM",
    languages: ["English", "Mandarin"],
    insurance: ["Cigna", "UnitedHealth", "Aetna"],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "General Physician",
    degree: "DO, Internal Medicine",
    experience: "8 Years",
    about: "Dedicated internist with a comprehensive approach to chronic disease management and primary care diagnostics. Passionate about community outreach.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    distance: 3.1,
    skills: ["General Practice", "Diagnostics", "Diabetes Care"],
    trustScore: 89,
    verified: true,
    rating: 4.7,
    reviews: 76,
    nextAvailable: "Wed, Oct 24",
    languages: ["English", "Spanish", "Portuguese"],
    insurance: ["Medicare", "Humana", "BlueCross"],
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    degree: "MD, Cardiology",
    experience: "25 Years",
    about: "Renowned for complex cardiac surgeries and heart failure management. Dr. Wilson leads multiple clinical trials and has published over 50 research papers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    distance: 4.0,
    skills: ["Heart Failure", "Surgery", "Valve Repair"],
    trustScore: 96,
    verified: true,
    rating: 5.0,
    reviews: 210,
    nextAvailable: "Fri, Oct 26",
    languages: ["English"],
    insurance: ["All Major Plans Accepted"],
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialty: "Emergency Medicine",
    degree: "MD, Emergency Medicine",
    experience: "10 Years",
    about: "Highly skilled in acute trauma care and critical emergency response. Known for her calm demeanor and fast, accurate diagnostics in high-pressure situations.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    distance: 1.8,
    skills: ["Trauma", "Acute Care", "Pediatric ER"],
    trustScore: 91,
    verified: true,
    rating: 4.8,
    reviews: 85,
    nextAvailable: "Available 24/7 (ER)",
    languages: ["English", "French"],
    insurance: ["Accepts All"],
  },
  {
    id: "6",
    name: "Dr. David Martinez",
    specialty: "Cardiologist",
    degree: "MD, Cardiology",
    experience: "7 Years",
    about: "Young innovator in minimally invasive cardiac procedures. Dr. Martinez is passionate about accessible healthcare and utilizing technology for better outcomes.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    distance: 5.3,
    skills: ["Intervention", "Stenting", "Angiography"],
    trustScore: 92,
    verified: true,
    rating: 4.9,
    reviews: 112,
    nextAvailable: "Thu, Oct 25",
    languages: ["English", "Spanish"],
    insurance: ["BlueCross", "UnitedHealth"],
  },
  {
    id: "7",
    name: "Dr. Robert Taylor",
    specialty: "Neurologist",
    degree: "MD, Neurology",
    experience: "14 Years",
    about: "Neurology specialist treating migraines, epilepsy, and neurodegenerative disorders. Uses a holistic approach combining medication and therapy.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    distance: 6.1,
    skills: ["Migraine", "Epilepsy", "Stroke Care"],
    trustScore: 89,
    verified: true,
    rating: 4.7,
    reviews: 64,
    nextAvailable: "Mon, Oct 29",
    languages: ["English", "German"],
    insurance: ["Aetna", "Humana"],
  },
  {
    id: "8",
    name: "Dr. Jennifer Lee",
    specialty: "Dermatologist",
    degree: "MD, Dermatology",
    experience: "9 Years",
    about: "Cosmetic and medical dermatology expert. Special interest in skin cancer prevention and advanced laser treatments.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    distance: 2.2,
    skills: ["Acne", "Skin Cancer", "Laser Therapy"],
    trustScore: 93,
    verified: true,
    rating: 4.8,
    reviews: 145,
    nextAvailable: "Tomorrow at 11:15 AM",
    languages: ["English", "Korean"],
    insurance: ["Cigna", "UnitedHealth"],
  },
  {
    id: "9",
    name: "Dr. William Brown",
    specialty: "Orthopedic",
    degree: "MD, Orthopedics",
    experience: "18 Years",
    about: "Orthopedic surgeon specializing in sports injuries and joint replacements. Team physician for several local sports teams.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
    distance: 4.5,
    skills: ["Joint Replacement", "Sports Medicine", "Fractures"],
    trustScore: 97,
    verified: true,
    rating: 4.9,
    reviews: 180,
    nextAvailable: "Tue, Oct 30",
    languages: ["English"],
    insurance: ["BlueCross", "Medicare"],
  },
  {
    id: "10",
    name: "Dr. Maria Santos",
    specialty: "Pediatrician",
    degree: "MD, Pediatrics",
    experience: "11 Years",
    about: "Compassionate pediatrician specializing in child development and preventive care. Creates a warm, child-friendly environment.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    distance: 2.8,
    skills: ["Child Care", "Vaccinations", "Development"],
    trustScore: 95,
    verified: true,
    rating: 4.9,
    reviews: 156,
    nextAvailable: "Tomorrow at 3:00 PM",
    languages: ["English", "Spanish", "Portuguese"],
    insurance: ["BlueCross", "Aetna", "Medicare"],
  },
  {
    id: "11",
    name: "Dr. Richard Park",
    specialty: "Psychiatrist",
    degree: "MD, Psychiatry",
    experience: "16 Years",
    about: "Experienced psychiatrist specializing in anxiety, depression, and trauma therapy. Combines medication management with therapeutic approaches.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Richard",
    distance: 3.5,
    skills: ["Anxiety", "Depression", "Trauma Therapy"],
    trustScore: 94,
    verified: true,
    rating: 4.8,
    reviews: 92,
    nextAvailable: "Thu, Oct 25",
    languages: ["English", "Korean"],
    insurance: ["UnitedHealth", "Cigna", "Aetna"],
  },
  {
    id: "12",
    name: "Dr. Susan Miller",
    specialty: "Gynecologist",
    degree: "MD, OB/GYN",
    experience: "13 Years",
    about: "Women's health specialist focusing on reproductive health and prenatal care. Committed to empowering women through education.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Susan",
    distance: 2.1,
    skills: ["Prenatal Care", "Women's Health", "Family Planning"],
    trustScore: 96,
    verified: true,
    rating: 4.9,
    reviews: 134,
    nextAvailable: "Tomorrow at 1:30 PM",
    languages: ["English"],
    insurance: ["BlueCross", "Aetna", "Medicare"],
  },
  {
    id: "13",
    name: "Dr. Thomas Wright",
    specialty: "Ophthalmologist",
    degree: "MD, Ophthalmology",
    experience: "20 Years",
    about: "Eye care specialist with expertise in cataract surgery and vision correction. Uses state-of-the-art technology for precise treatments.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    distance: 4.2,
    skills: ["Cataract Surgery", "Vision Correction", "Eye Disease"],
    trustScore: 97,
    verified: true,
    rating: 5.0,
    reviews: 198,
    nextAvailable: "Fri, Oct 26",
    languages: ["English", "French"],
    insurance: ["All Major Plans Accepted"],
  },
  {
    id: "14",
    name: "Dr. Angela Davis",
    specialty: "ENT",
    degree: "MD, Otolaryngology",
    experience: "12 Years",
    about: "ENT specialist treating ear, nose, and throat conditions. Expert in both medical and surgical interventions.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Angela",
    distance: 3.3,
    skills: ["Sinus Treatment", "Hearing Loss", "Throat Disorders"],
    trustScore: 91,
    verified: true,
    rating: 4.7,
    reviews: 88,
    nextAvailable: "Mon, Oct 29",
    languages: ["English", "Spanish"],
    insurance: ["Cigna", "UnitedHealth", "Medicare"],
  },
];

/**
 * Get all doctors
 */
export const getAllDoctors = (): Doctor[] => {
  return mockDoctors;
};

/**
 * Get doctors by specialty
 */
export const getDoctorsBySpecialty = (specialty: string): Doctor[] => {
  if (!specialty) return mockDoctors;
  
  return mockDoctors.filter(
    (doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase()
  );
};

/**
 * Filter doctors based on criteria
 */
export const filterDoctors = (filters: DoctorFilter): Doctor[] => {
  let filtered = [...mockDoctors];

  if (filters.specialty) {
    filtered = filtered.filter(
      (doctor) => doctor.specialty.toLowerCase() === filters.specialty?.toLowerCase()
    );
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter((doctor) => doctor.rating >= filters.minRating!);
  }

  if (filters.maxDistance !== undefined) {
    filtered = filtered.filter((doctor) => doctor.distance <= filters.maxDistance!);
  }

  if (filters.languages && filters.languages.length > 0) {
    filtered = filtered.filter((doctor) =>
      filters.languages!.some((lang) =>
        doctor.languages.some((doctorLang) => doctorLang.toLowerCase() === lang.toLowerCase())
      )
    );
  }

  return filtered;
};

/**
 * Search doctors by name or specialty
 */
export const searchDoctors = (query: string): Doctor[] => {
  if (!query) return mockDoctors;

  const lowerQuery = query.toLowerCase();
  return mockDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(lowerQuery) ||
      doctor.specialty.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Sort doctors by various criteria
 */
export const sortDoctors = (
  doctors: Doctor[],
  sortBy: "rating" | "distance" | "experience"
): Doctor[] => {
  const sorted = [...doctors];

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "distance":
      return sorted.sort((a, b) => a.distance - b.distance);
    case "experience":
      return sorted.sort((a, b) => {
        const expA = parseInt(a.experience);
        const expB = parseInt(b.experience);
        return expB - expA;
      });
    default:
      return sorted;
  }
};

/**
 * Get doctor by ID
 */
export const getDoctorById = (id: string): Doctor | undefined => {
  return mockDoctors.find((doctor) => doctor.id === id);
};

/**
 * Get top-rated doctors (limit to top N)
 */
export const getTopRatedDoctors = (limit: number = 3): Doctor[] => {
  return sortDoctors(mockDoctors, "rating").slice(0, limit);
};
