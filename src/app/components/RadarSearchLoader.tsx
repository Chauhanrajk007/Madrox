import { motion } from "motion/react";
import { Activity, Stethoscope, MapPin, User, Plus, Heart } from "lucide-react";
import { createPortal } from "react-dom";

const WIDGET_ICONS = [Stethoscope, MapPin, User, Plus, Heart];

export function RadarSearchLoader() {
    // Generate a fixed set of particles to ensure a seamless loop
    const particles = Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        angle: (i / 16) * 360 + (Math.random() * 20 - 10), // Evenly distributed with jitter
        distance: 180 + Math.random() * 100, // Varying distances
        duration: 3 + Math.random() * 1, // 3-4s duration
        delay: (i / 16) * 3, // Staggered delays for continuous stream
        Icon: WIDGET_ICONS[i % WIDGET_ICONS.length],
        isIcon: i % 2 === 0, // Mix of icons and dots
    }));

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm">
            {/* Central Logo */}
            <div className="relative z-20">
                <motion.div
                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-primary/20 z-20 relative border border-primary/10"
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 10px 25px -5px rgba(var(--primary-rgb), 0.1)",
                            "0 10px 40px -5px rgba(var(--primary-rgb), 0.3)",
                            "0 10px 25px -5px rgba(var(--primary-rgb), 0.1)",
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                </motion.div>

                {/* Subtle Pulse Rings */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 -z-10"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border border-primary/40 -z-10"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
            </div>

            {/* Radiating Widgets */}
            {particles.map((p) => (
                <RadarWidget key={p.id} {...p} />
            ))}

            {/* Loading Text */}
            <motion.div
                className="absolute mt-48 text-primary/80 font-medium tracking-wide text-sm uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Searching nearby specialists...
            </motion.div>
        </div>,
        document.body
    );
}

function RadarWidget({ angle, distance, duration, delay, Icon, isIcon }: { angle: number; distance: number; duration: number; delay: number; Icon: any; isIcon: boolean }) {
    const rad = (angle * Math.PI) / 180;
    // Combine x,y into a single variant if needed, or just animate logic directly
    // We want to start slightly OUTSIDE the logo (e.g. radius 40)
    const startRadius = 40;
    const startX = Math.cos(rad) * startRadius;
    const startY = Math.sin(rad) * startRadius;

    const endX = Math.cos(rad) * distance;
    const endY = Math.sin(rad) * distance;

    return (
        <motion.div
            className={`absolute flex items-center justify-center rounded-full z-10 ${isIcon ? "bg-white shadow-sm border border-primary/10" : "bg-primary/60"}`}
            style={{
                width: isIcon ? 36 : 8,
                height: isIcon ? 36 : 8
            }}
            initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
            animate={{
                x: endX,
                y: endY,
                opacity: [0, 1, 1, 0], // Fade in quickly, stay, fade out at end
                scale: [0.5, 1, 0.8, 0.4] // Grow a bit then shrink
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut", // Soft ease-out
            }}
        >
            {isIcon && <Icon className="w-4 h-4 text-primary/80" />}
        </motion.div>
    );
}
