import { OrdemVenda } from "../domain/ordemVenda";
import { instanceApi } from "./axiosConfig";

export const add = async (ordemVenda: OrdemVenda): Promise<OrdemVenda> => {
  return (await instanceApi.post<OrdemVenda>("/produto", ordemVenda)).data;
};

