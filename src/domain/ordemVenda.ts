import { Base } from "./base";
import { EOrdemVendaStatus } from "./eOrdemVendaStatus";
import { Produto } from "./produto";

export interface OrdemVenda extends Base {
    cpf: string;
    produtos: Produto[];
    referencia: string;
    status: EOrdemVendaStatus;
}