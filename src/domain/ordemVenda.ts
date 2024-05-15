import { Base } from "./base";
import { Cliente } from "./cliente";
import { EOrdemVendaStatus } from "./eOrdemVendaStatus";
import { Prestador } from "./prestador";
import { Produto } from "./produto";

export interface OrdemVenda extends Base {
    cpf: string;
    email: string;
    produtos: Produto[];
    referencia: string;
    status: EOrdemVendaStatus;
    prestador?: Prestador;
    prestadorId?: string;
    cliente?: Cliente;
    clienteId?: string;
}