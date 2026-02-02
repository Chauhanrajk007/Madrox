import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { PageTransition } from "@/app/components/PageTransition";
import { Video, MoreVertical, Calendar, Clock, FileText, Upload, File, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

const doctorsData = [
    {
        id: "1",
        name: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        degrees: "MD, PhD",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
        status: "Active Now",
        statusColor: "bg-red-50 text-red-600",
        availability: "Today, Oct 24 • 02:00 PM - 02:45 PM"
    },
    {
        id: "2",
        name: "Dr. John Doe",
        specialty: "General Practitioner",
        degrees: "MBBS, MD",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
        status: "Online",
        statusColor: "bg-emerald-50 text-emerald-600",
        availability: "Tomorrow • 10:00 AM - 12:00 PM"
    },
    {
        id: "3",
        name: "Dr. Emily Chen",
        specialty: "Neurologist",
        degrees: "MD, DM",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop",
        status: "Available",
        statusColor: "bg-blue-50 text-blue-600",
        availability: "Mon, Oct 28 • 09:00 AM - 11:00 AM"
    }
];

export function DoctorDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const doctor = doctorsData.find(d => d.id === id);

    useEffect(() => {
        if (!doctor) {
            // navigate("/dashboard");
        }
    }, [doctor, navigate]);

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <p className="text-lg font-medium text-gray-500">Doctor not found</p>
                    <Button onClick={() => navigate("/dashboard")} variant="outline">Back to Dashboard</Button>
                </div>
            </div>
        );
    }

    return (
        <PageTransition className="min-h-screen bg-gray-50/50 pb-32">
            <Navigation />

            <main className="pt-24 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
                {/* Header Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-100/50 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                >
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <Avatar className="w-24 h-24 rounded-[24px] border-4 border-white shadow-lg">
                                <AvatarImage src={doctor.image} className="object-cover" />
                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className={`absolute bottom-0 right-0 w-6 h-6 border-4 border-white rounded-full ${doctor.status === "Active Now" ? "bg-red-500" : "bg-emerald-500"}`}></span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.name}</h1>
                                <Badge variant="secondary" className={`${doctor.statusColor} hover:${doctor.statusColor.split(' ')[0]} border-0 text-xs font-bold px-3 py-1`}>{doctor.status}</Badge>
                            </div>
                            <p className="text-base text-gray-500 font-medium">{doctor.specialty} • {doctor.degrees}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 pt-1">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{doctor.availability.split('•')[0]}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{doctor.availability.split('•')[1] || "Available"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button size="lg" className="flex-1 md:flex-none h-12 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/20 font-bold gap-2">
                            <Video className="w-5 h-5" />
                            Join Call
                        </Button>
                        <Button size="icon" variant="outline" className="h-12 w-12 rounded-xl border-gray-200 text-gray-400 hover:text-gray-900">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>

                {/* Tabs & Content */}
                <div className="space-y-6">
                    <Tabs defaultValue="documents" className="w-full">
                        <TabsList className="bg-transparent p-0 gap-6 h-auto mb-6 flex-wrap justify-start">
                            <TabsTrigger value="overview" className="bg-transparent border-0 shadow-none p-0 text-base font-medium text-gray-400 data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="documents" className="bg-transparent border-0 shadow-none p-0 text-base font-medium text-gray-400 data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform">
                                Documents & Uploads
                            </TabsTrigger>
                            <TabsTrigger value="prescriptions" className="bg-transparent border-0 shadow-none p-0 text-base font-medium text-gray-400 data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform">
                                Prescriptions
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="documents" className="space-y-8 focus-visible:outline-none">
                            {/* Upload Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-red-500" />
                                    Upload New File
                                </h3>
                                <div className="border-2 border-dashed border-red-100 bg-red-50/30 rounded-[24px] h-48 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-red-50/50 hover:border-red-200 transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-red-600 font-bold text-lg">Click to upload or drag files here</p>
                                        <p className="text-gray-400 text-sm">Support for PDF, JPG, PNG (Max 10MB)</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Attached Documents */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Attached Documents</h3>
                                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">3 Files</span>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { name: "Lab_Results_Bloodwork.pdf", size: "1.2 MB", date: "Uploaded Yesterday", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
                                        { name: "X-Ray_Chest_Scan_004.jpg", size: "4.5 MB", date: "Oct 22, 2023", icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-50" },
                                        { name: "Prior_Consultation_Notes.docx", size: "0.8 MB", date: "Sep 15, 2023", icon: File, color: "text-gray-500", bg: "bg-gray-100" }
                                    ].map((file, i) => (
                                        <div key={i} className="bg-white rounded-[20px] p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-100/50">
                                            <div className={`w-12 h-12 rounded-2xl ${file.bg} flex items-center justify-center ${file.color}`}>
                                                <file.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">{file.name}</h4>
                                                <p className="text-xs text-gray-400 font-medium">{file.size} • {file.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="overview">
                            <div className="text-center py-12 text-gray-400">
                                <p>Overview for {doctor.name}</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="prescriptions">
                            <div className="text-center py-12 text-gray-400">No prescriptions found.</div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </PageTransition>
    );
}

function Plus(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
