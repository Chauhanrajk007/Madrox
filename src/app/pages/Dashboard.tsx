import { Navigation } from "@/app/components/Navigation";
import { Button } from "@/app/components/ui/button";
import { MessageCircle, ChevronRight, Plus, Star } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PageTransition } from "@/app/components/PageTransition";
import { Footer } from "@/app/components/Footer";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

const activeDoctors = [
    {
        id: 1,
        name: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
        status: "Today 2:00 PM",
        statusColor: "bg-red-100 text-red-600",
        rating: 4.8
    },
    {
        id: 2,
        name: "Dr. John Doe",
        specialty: "General Practitioner",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
        status: "Pending Results",
        statusColor: "bg-amber-100 text-amber-600",
        rating: 4.9
    },
    {
        id: 3,
        name: "Dr. Emily Chen",
        specialty: "Neurologist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop",
        status: "Tomorrow 10:00 AM",
        statusColor: "bg-blue-100 text-blue-600",
        rating: 4.7
    }
];

const visitHistory = [
    {
        id: 1,
        doctor: "Dr. Emily Chen",
        specialty: "Migraine, Nausea",
        date: "Oct 12",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 2,
        doctor: "Dr. Mark Wilson",
        specialty: "Annual Checkup",
        date: "Sep 05",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 3,
        doctor: "Dr. Sarah Smith",
        specialty: "Chest Pain",
        date: "Aug 20",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop"
    }
];

export function Dashboard() {
    return (
        <PageTransition className="min-h-screen bg-gray-50/50 pb-32">
            <Navigation />

            <main className="pt-24 px-4 md:px-6 max-w-7xl mx-auto space-y-8">


                {/* Active Doctors Section */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-xl font-bold text-gray-900">Active Doctors</h2>
                        <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/5 font-medium">
                            See all
                        </Button>
                    </div>

                    <ScrollArea className="w-full whitespace-nowrap pb-4">
                        <div className="flex space-x-4 pb-2">
                            {activeDoctors.map((doctor, i) => (
                                <motion.div
                                    key={doctor.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="inline-block w-[280px] md:w-[320px] bg-white rounded-[24px] p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-40 rounded-[20px] overflow-hidden mb-4 group">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${doctor.statusColor} shadow-sm`}>
                                                {doctor.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-lg text-gray-900 truncate">{doctor.name}</h3>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                <span className="text-sm font-semibold">{doctor.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Link to={`/doctor-details/${doctor.id}`} className="flex-1">
                                            <Button className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white font-semibold transition-colors">
                                                Details
                                            </Button>
                                        </Link>
                                        <Button size="icon" variant="outline" className="rounded-xl border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30">
                                            <MessageCircle className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Find Doctor Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex w-[120px] bg-gray-50 rounded-[24px] border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer items-center justify-center flex-col gap-2 group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-gray-400 group-hover:text-primary">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold text-gray-400 group-hover:text-primary">Find Doctor</span>
                            </motion.div>
                        </div>
                        <ScrollBar orientation="horizontal" className="hidden" />
                    </ScrollArea>
                </section>

                {/* Visit History Section */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Visit History</h2>
                    <div className="space-y-4">
                        {visitHistory.map((visit, i) => (
                            <motion.div
                                key={visit.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="group bg-white rounded-[20px] p-4 flex items-center justify-between shadow-sm border border-gray-100/50 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm">
                                        <AvatarImage src={visit.image} className="object-cover" />
                                        <AvatarFallback>DR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{visit.doctor}</h3>
                                        <p className="text-sm text-gray-500">{visit.specialty}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">{visit.date}</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </PageTransition>
    );
}
