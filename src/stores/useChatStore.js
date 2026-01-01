import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      isOpen: false,
      isTyping: false,
      conversationId: null,

      setIsOpen: (isOpen) => set({ isOpen }),
      setIsTyping: (isTyping) => set({ isTyping }),
      setConversationId: (conversationId) => set({ conversationId }),

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              ...message,
            },
          ],
        })),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "aem-chat-storage",
      partialize: (state) => ({
        messages: state.messages,
        conversationId: state.conversationId,
      }),
    }
  )
);
