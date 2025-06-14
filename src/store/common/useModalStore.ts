import { ModalData, ModalType } from "@/components/views/ui/MultiModal";
import { create } from "zustand";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  openModal: (type: ModalType, data: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  openModal: (type, data) => set({ type, isOpen: true, data }),
  closeModal: () => set({ type: null, isOpen: false, data: {} }),
}));
