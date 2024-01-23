import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStore {
  isExpanded: boolean;
  variant: ChatVariant;
  collapse: () => void;
  expand: () => void;
  changeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  isExpanded: true,
  variant: ChatVariant.CHAT,
  expand: () => set(() => ({ isExpanded: true })),
  collapse: () => set(() => ({ isExpanded: false })),
  changeVariant: (variant: ChatVariant) => set(() => ({ variant: variant })),
}));
