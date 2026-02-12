import { Navigation } from "@/app/components/Navigation";
import { DoctorCard } from "@/app/components/DoctorCard";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBlobs } from "@/app/components/BackgroundBlobs";
import { PageTransition } from "@/app/components/PageTransition";
import { Footer } from "@/app/components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { RadarSearchLoader } from "@/app/components/RadarSearchLoader";
import { X, MapPin, Shield, CheckCircle, GraduationCap, Briefcase, Star, Calendar, Languages, Building2, Clock, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { createPortal } from "react-dom";
import { matchSymptomsToSpecialties } from "@/app/utils/symptomMatcher";

// Rich Mock Data
const mockDoctors = [
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
    specialty: "Internal Medicine",
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
    specialty: "Interventional Cardiology",
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
    specialty: "Orthopedic Surgeon",
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
  }
];

export function DoctorSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get symptoms from URL parameters
  const symptomsQuery = searchParams.get('symptoms');
  
  // Match symptoms to specialties
  const matchedSpecialties = symptomsQuery 
    ? matchSymptomsToSpecialties(symptomsQuery) 
    : [];
  
  // Filter doctors based on matched specialties
  const filteredDoctors = symptomsQuery
    ? matchedSpecialties.length > 0
      ? mockDoctors.filter(doctor => 
          matchedSpecialties.includes(doctor.specialty)
        )
      : [] // No matches - show empty results
    : mockDoctors; // No symptoms - show all doctors

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const selectedDoctor = mockDoctors.find(d => d.id === selectedId);

  return (
    <PageTransition className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <BackgroundBlobs />
      <Navigation />

      {isLoading && <RadarSearchLoader />}

      <main className="pt-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Find Doctors Near You
            </h1>
            <p className="text-muted-foreground">
              {symptomsQuery 
                ? `Showing ${filteredDoctors.length} specialists for '${symptomsQuery}'`
                : `Showing ${filteredDoctors.length} specialists matching your search`
              }
            </p>
          </motion.div>

          {/* Doctor Cards Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onClick={() => setSelectedId(doctor.id)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-16 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="bg-secondary/20 rounded-full p-8 mb-6">
                <Shield className="w-16 h-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                No doctors found
              </h2>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                We couldn't find any specialists matching your symptoms. Try searching with different terms or view all available doctors.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/doctor-search')}
                className="rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                View All Doctors
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Expanded Card Portal */}
      {createPortal(
        <AnimatePresence>
          {selectedId && selectedDoctor && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none">
              {/* Flexible Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-md pointer-events-auto"
              />

              {/* Expanded Layout */}
              <motion.div
                layoutId={selectedId}
                className="bg-card w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative pointer-events-auto flex flex-col md:flex-row max-h-[85vh] md:max-h-[800px] border border-white/20"
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  className="absolute top-6 right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors z-20"
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.button>

                {/* Left Panel: Identity & Key Stats */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-primary/5 via-secondary/20 to-background p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border/50 relative overflow-hidden">
                  {/* Decorative blobs */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute top-40 -right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
                  </div>

                  <motion.div layoutId={`avatar-${selectedId}`} className="relative mb-6 z-10">
                    <Avatar className="w-40 h-40 border-[6px] border-background shadow-2xl">
                      <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                      <AvatarFallback className="bg-primary/5 text-primary text-5xl font-medium">
                        {selectedDoctor.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedDoctor.verified && (
                      <motion.div
                        layoutId={`verified-${selectedId}`}
                        className="absolute bottom-2 right-2 bg-background rounded-full p-1.5 text-primary shadow-lg"
                      >
                        <CheckCircle className="w-8 h-8 fill-background" />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.h2 layoutId={`name-${selectedId}`} className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight z-10">
                    {selectedDoctor.name}
                  </motion.h2>
                  <motion.p layoutId={`specialty-${selectedId}`} className="text-lg text-primary font-medium mb-6 z-10">
                    {selectedDoctor.specialty}
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-2 gap-3 w-full max-w-xs z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="bg-background/60 backdrop-blur-sm p-3 rounded-2xl border border-border/50 flex flex-col items-center">
                      <Star className="w-5 h-5 text-yellow-500 mb-1" fill="currentColor" />
                      <span className="font-bold text-foreground">{selectedDoctor.rating}</span>
                      <span className="text-[10px] text-muted-foreground">{selectedDoctor.reviews} reviews</span>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm p-3 rounded-2xl border border-border/50 flex flex-col items-center">
                      <Briefcase className="w-5 h-5 text-blue-500 mb-1" />
                      <span className="font-bold text-foreground">{selectedDoctor.experience}</span>
                      <span className="text-[10px] text-muted-foreground">Experience</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="mt-auto pt-6 w-full z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                      <div className="flex items-center gap-3 text-left mb-2">
                        <GraduationCap className="w-5 h-5 text-primary/70" />
                        <div>
                          <p className="text-xs text-muted-foreground font-semibold uppercase">Education</p>
                          <p className="text-sm font-medium text-foreground">{selectedDoctor.degree}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-left">
                        <Globe className="w-5 h-5 text-primary/70" />
                        <div>
                          <p className="text-xs text-muted-foreground font-semibold uppercase">Languages</p>
                          <p className="text-sm font-medium text-foreground">{selectedDoctor.languages.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Panel: Details & Actions */}
                <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto scrollbar-hide bg-card flex flex-col">
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10, transition: { duration: 0.15 } }}
                    transition={{ delay: 0.2, type: "spring", damping: 25 }}
                  >
                    {/* Bio */}
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-primary rounded-full" /> About
                      </h3>
                      <p className="text-lg text-foreground/80 leading-relaxed font-light">
                        {selectedDoctor.about}
                      </p>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-4 bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">Next Available</p>
                        <p className="text-foreground font-semibold">{selectedDoctor.nextAvailable}</p>
                      </div>
                      <Button variant="ghost" className="ml-auto text-green-700 hover:text-green-800 hover:bg-green-100">See Schedule</Button>
                    </div>

                    {/* Skills Grid */}
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-blue-500 rounded-full" /> Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedDoctor.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="px-4 py-2 text-sm font-normal bg-secondary hover:bg-secondary/80 text-foreground border-transparent rounded-lg"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Trust Match */}
                    <div className="bg-secondary/10 rounded-2xl p-6 border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-foreground">AI Match Confidence</span>
                        </div>
                        <span className="text-2xl font-bold text-primary">{selectedDoctor.trustScore}%</span>
                      </div>
                      <Progress value={selectedDoctor.trustScore} className="h-3 bg-secondary" />
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Verified Credentials</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-500" />
                          <span>In Network ({selectedDoctor.insurance[0]}+)</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Footer Actions */}
                  <motion.div
                    className="mt-auto pt-8 flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button size="lg" className="flex-1 h-14 text-lg font-semibold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-2">
                      <MapPin className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <Footer />
    </PageTransition>
  );
}