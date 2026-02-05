export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  experience: string;
  about: string;
  avatar: string;
  distance: number;
  skills: string[];
  trustScore: number;
  verified: boolean;
  rating: number;
  reviews: number;
  nextAvailable: string;
  languages: string[];
  insurance: string[];
}

export interface DoctorFilter {
  specialty?: string;
  minRating?: number;
  maxDistance?: number;
  languages?: string[];
}
