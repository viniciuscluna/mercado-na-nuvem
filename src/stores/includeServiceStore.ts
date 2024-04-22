import { create } from "zustand";

type IncludeServiceProps = {
  isNewSellOpened: boolean;
  isConfirmSellOpened: boolean;
  isProductOpened: boolean;
  setIsNewSellOpened: (isNewSellOpened: boolean) => void;
  setIsConfirmSellOpened: (isConfirmSellOpened: boolean) => void;
  setIsProductOpened: (isProductOpened: boolean) => void;
};

export const useIncludeServiceStore = create<IncludeServiceProps>((set) => ({
  isNewSellOpened: true,
  isProductOpened: false,
  isConfirmSellOpened: false,
  setIsNewSellOpened: (isNewSellOpened: boolean) =>
    set({ isNewSellOpened: isNewSellOpened }),
  setIsProductOpened: (isProductOpened: boolean) =>
    set({ isProductOpened: isProductOpened }),
  setIsConfirmSellOpened: (isConfirmSellOpened: boolean) =>
    set({ isConfirmSellOpened: isConfirmSellOpened }),
}));
