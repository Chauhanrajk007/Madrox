// Custom event for opening chat from anywhere in the app
export const OPEN_CHAT_EVENT = "madrox:open-chat";

export const openChat = () => {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
};

export const useOpenChatListener = (callback: () => void) => {
  const handleOpenChat = () => callback();
  
  if (typeof window !== "undefined") {
    window.addEventListener(OPEN_CHAT_EVENT, handleOpenChat);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpenChat);
  }
  return () => {};
};
