import { Navigation } from "@/app/components/Navigation";
import { Link } from "react-router";
import { BackgroundBlobs } from "@/app/components/BackgroundBlobs";
import { Button } from "@/app/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Activity, Users } from "lucide-react";
import { PageTransition } from "@/app/components/PageTransition";
import { Footer } from "@/app/components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <PageTransition className="min-h-screen relative overflow-hidden">
      <BackgroundBlobs />
      <Navigation />

      <main className="relative pt-24 pb-16 px-6 z-10 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left Column: Hero Text */}
            <motion.div
              className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="space-y-4">
                <motion.span
                  variants={wordVariants}
                  className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium border border-primary/20"
                >
                  AI-Powered Healthcare Advocacy
                </motion.span>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
                  <motion.span variants={wordVariants} className="block">Democratizing</motion.span>
                  <motion.span variants={wordVariants} className="bg-grad-main bg-clip-text text-transparent block pb-2">Fair Healthcare</motion.span>
                </h1>

                <motion.p variants={wordVariants} className="text-lg md:text-xl text-muted-foreground font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Stop overpaying for medical bills. Our AI analyzes, audits, and generates dispute letters to save you money in seconds.
                </motion.p>
              </div>

              <motion.div variants={wordVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/bill-audit">
                  <Button size="lg" className="h-12 md:h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow w-full sm:w-auto">
                    Audit My Bill
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/doctor-search">
                  <Button variant="outline" size="lg" className="h-12 md:h-14 px-8 text-lg rounded-full bg-white/50 border-primary/20 hover:bg-white/80 backdrop-blur-sm w-full sm:w-auto">
                    Find a Doctor
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={wordVariants} className="pt-4 md:pt-8 flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  <span>95% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>10k+ Users</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Visual/3D Placeholder */}
            <motion.div
              className="flex-1 w-full max-w-sm md:max-w-xl lg:max-w-none order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Glass Card Container */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="aspect-square md:aspect-[4/3] bg-white/40 backdrop-blur-xl border border-white/50 rounded-[24px] md:rounded-[32px] shadow-[0_32px_64px_-16px_rgba(169,38,85,0.15)] flex items-center justify-center p-6 md:p-8 relative z-20 overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />

                  {/* Mock UI Content */}
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between p-3 md:p-4 bg-white/60 rounded-2xl shadow-sm border border-white/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm md:text-base">Medical Bill Audit</div>
                          <div className="text-[10px] md:text-xs text-muted-foreground">Processing...</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-sm md:text-base">₹85,000</div>
                        <div className="text-[10px] md:text-xs text-secondary">Potential Savings: ₹35,000</div>
                      </div>
                    </div>

                    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                      <div className="h-2 w-3/4 bg-primary/10 rounded-full" />
                      <div className="h-2 w-1/2 bg-primary/10 rounded-full" />
                      <div className="h-2 w-5/6 bg-primary/10 rounded-full" />
                    </div>

                    <div className="p-3 md:p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                      <div className="text-sm font-medium text-secondary-foreground mb-1">AI Insight</div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">Duplicate charge detected for "Metabolic Panel". Recommended action: Dispute.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements behind card */}
                <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-32 h-32 md:w-48 md:h-48 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-32 h-32 md:w-48 md:h-48 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
}