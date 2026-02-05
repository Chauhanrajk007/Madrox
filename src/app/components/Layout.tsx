import { Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { FloatingSearchBar } from "@/app/components/FloatingSearchBar";
import { ChatButton } from "@/app/components/ChatButton";
import { ChatInterface } from "@/app/components/ChatInterface";
import { OPEN_CHAT_EVENT } from "@/services/chatEvents";

export function Layout() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Listen for open chat events from anywhere in the app
    useEffect(() => {
        const handleOpenChat = () => setIsChatOpen(true);
        window.addEventListener(OPEN_CHAT_EVENT, handleOpenChat);
        return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpenChat);
    }, []);

    return (
        <>
            <ScrollToTop />
            <Outlet />
            {!isLoginPage && (
                <>
                    <FloatingSearchBar />
                    <ChatButton 
                        onClick={() => setIsChatOpen(true)} 
                        isOpen={isChatOpen} 
                    />
                    <ChatInterface 
                        isOpen={isChatOpen} 
                        onClose={() => setIsChatOpen(false)} 
                    />
                </>
            )}
        </>
    );
}
