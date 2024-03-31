import { create } from "zustand";
import { PrestacaoServico } from "../domain/prestacaoServico";
import { OrdemVenda } from "../domain/ordemVenda";

type ServiceProps = {
  servicos: PrestacaoServico[];
  ordemVendas: OrdemVenda[];
  setServicos: (servicos: PrestacaoServico[]) => void;
  setOrdemVenda: (ordemVendas: OrdemVenda[]) => void;
};

export const useServiceStore = create<ServiceProps>((set) => ({
  ordemVendas: [],
  servicos: [],
  setServicos: (servicos: PrestacaoServico[]) => set({ servicos: servicos }),
  setOrdemVenda: (ordemVendas: OrdemVenda[]) => set({ordemVendas: ordemVendas})
}));
