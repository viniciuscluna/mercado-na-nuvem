import { OrdemVenda } from "../domain/ordemVenda";
import { instanceApi } from "./axiosConfig";

export const add = async (ordemVenda: OrdemVenda): Promise<OrdemVenda> => {
  return (await instanceApi.post<OrdemVenda>("/ordemVenda", ordemVenda)).data;
};

export const getId = async (ordemVenda: string): Promise<OrdemVenda> => {
  const result = await instanceApi.get<OrdemVenda>(
    `/ordemVenda/${ordemVenda}`

  );
  return result.data;
};


export const getAllInDone = async (): Promise<OrdemVenda[]> => {
  const result = await instanceApi.get<OrdemVenda[]>(
    `/ordemVenda/ordemVendaFechadosPrestador`
  );
  return result.data;
};
