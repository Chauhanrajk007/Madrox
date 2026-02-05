import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const [hasNotification] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={onClick}
            size="icon"
            className="relative h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-110"
          >
            {/* Pulse animation when idle */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <MessageCircle className="w-7 h-7 relative z-10" />
            
            {/* Notification badge */}
            {hasNotification && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold"
              >
                1
              </motion.span>
            )}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
