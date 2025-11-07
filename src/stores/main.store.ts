import { Cliente } from "@/type/clientes";
import { User } from "@/type/users";
import { create } from "zustand";

interface MainStore {
  tempCliente: Cliente | null;
  setTempCliente: (tempCliente: Cliente | null) => void;
  tempAvatar: string | null;
  setTempAvatar: (tempAvatar: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  tempCliente: null,
  setTempCliente: (tempCliente: Cliente | null) => set({ tempCliente }),
  tempAvatar: null,
  setTempAvatar: (tempAvatar: string | null) => set({ tempAvatar }),
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

