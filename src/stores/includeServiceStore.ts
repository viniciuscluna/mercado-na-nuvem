import { create } from "zustand";

type IncludeServiceProps = {
  isNewSellOpened: boolean;
  isProductOpened: boolean;
  setIsNewSellOpened: (isNewSellOpened: boolean) => void;
  setIsProductOpened: (isProductOpened: boolean) => void;
};

export const useIncludeServiceStore = create<IncludeServiceProps>((set) => ({
  isNewSellOpened: true,
  isProductOpened: false,
  setIsNewSellOpened: (isNewSellOpened: boolean) =>
    set({ isNewSellOpened: isNewSellOpened }),
    setIsProductOpened: (isProductOpened: boolean) =>
    set({ isProductOpened: isProductOpened }),
}));
