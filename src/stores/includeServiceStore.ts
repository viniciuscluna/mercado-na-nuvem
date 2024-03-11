import { create } from "zustand";

type IncludeServiceProps = {
  isNewSellOpened: boolean;
  setIsNewSellOpened: (isNewSellOpened: boolean) => void;
};

export const useIncludeServiceStore = create<IncludeServiceProps>((set) => ({
  isNewSellOpened: true,
  setIsNewSellOpened: (isNewSellOpened: boolean) =>
    set({ isNewSellOpened: isNewSellOpened }),
 
}));
