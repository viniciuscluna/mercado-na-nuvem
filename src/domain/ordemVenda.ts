import { Base } from "./base";
import { Produto } from "./produto";

export interface OrdemVenda extends Base {
    cpf: string;
    produtos: Produto[];
}