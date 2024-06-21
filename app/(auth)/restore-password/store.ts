import { create } from "zustand";

type RestorePasswordStore = {
  id: string;
  login: string;
  code: string;
  setId: (value: string) => void;
  setLogin: (value: string) => void;
  setCode: (value: string) => void;
  reset: () => void;
};

export const useRestorePasswordStore = create<RestorePasswordStore>((set) => ({
  id: "",
  login: "",
  code: "",
  setId: (value) => set({ id: value }),
  setLogin: (value) => set({ login: value }),
  setCode: (value) => set({ code: value }),
  reset: () => set({ id: "", code: "", login: "" }),
}));
