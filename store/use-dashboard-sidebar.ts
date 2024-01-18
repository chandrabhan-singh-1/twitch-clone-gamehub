import { create } from "zustand";

interface DashboardSidebarStore {
  isExpanded: boolean;
  collapse: () => void;
  expand: () => void;
}

export const useDashboardSidebar = create<DashboardSidebarStore>((set) => ({
  isExpanded: true,
  expand: () => set(() => ({ isExpanded: true })),
  collapse: () => set(() => ({ isExpanded: false })),
}));
