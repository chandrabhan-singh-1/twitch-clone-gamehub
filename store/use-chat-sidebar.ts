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
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  isExpanded: true,
  variant: ChatVariant.CHAT,
  expand: () => set(() => ({ isExpanded: true })),
  collapse: () => set(() => ({ isExpanded: false })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant: variant })),
}));
