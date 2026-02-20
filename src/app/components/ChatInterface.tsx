import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { ChatMessage } from "@/types/chatbot";
import {
  getWelcomeMessage,
  generateChatResponse,
  createChatMessage,
} from "@/services/chatbotService";
import { useNavigate } from "react-router";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([getWelcomeMessage()]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = createChatMessage("user", inputValue);
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate bot response
    const response = generateChatResponse(inputValue);
    const botMessage = createChatMessage("bot", response.message, response.doctors);

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDoctorClick = (doctorId: string) => {
    navigate(`/doctor-details/${doctorId}`);
    onClose();
  };

  const handleStartOver = () => {
    setMessages([getWelcomeMessage()]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[70] w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-card/95 backdrop-blur-xl border border-border rounded-[32px] shadow-2xl shadow-primary/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=AIDoctor" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Health Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    {/* Message Bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=AIDoctor" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>

                    {/* Doctor Cards */}
                    {message.doctors && message.doctors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 ml-11 space-y-2"
                      >
                        {message.doctors.map((doctor) => (
                          <motion.div
                            key={doctor.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleDoctorClick(doctor.id)}
                            className="bg-background/60 backdrop-blur-sm border border-border rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-12 w-12 shrink-0">
                                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="font-semibold text-sm text-foreground">
                                      {doctor.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {doctor.specialty}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <span className="text-yellow-500 text-sm">★</span>
                                    <span className="text-sm font-medium">{doctor.rating}</span>
                                  </div>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{doctor.experience}</span>
                                  <span>•</span>
                                  <span>{doctor.distance} km</span>
                                </div>
                                <div className="mt-2">
                                  <span className="text-xs text-primary font-medium">
                                    {doctor.nextAvailable}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=AIDoctor" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length > 2 && (
              <div className="px-6 pb-2 flex gap-2">
                <Button
                  onClick={handleStartOver}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                >
                  Start Over
                </Button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 pt-3 border-t border-border/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms..."
                  className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="rounded-full w-10 h-10 shrink-0"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
