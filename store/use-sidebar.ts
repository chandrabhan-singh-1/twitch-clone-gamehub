import { create } from "zustand";

interface SidebarStore {
  isExpanded: boolean;
  collapse: () => void;
  expand: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isExpanded: true,
  expand: () => set(() => ({ isExpanded: true })),
  collapse: () => set(() => ({ isExpanded: false })),
}));
