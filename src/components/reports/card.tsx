import { useMemo } from "react";

import Badge from "./badge";
import ListProdutos from "./listProdutos";
import { currencyFormat } from "../../utils/currencyFormater";
import { OrdemVenda } from "../../domain/ordemVenda";
import { EOrdemVendaStatus } from "../../domain/eOrdemVendaStatus";
import { cpfFormater } from "../../utils/cpfFormater";
type CardProps = {
  ordemVenda: OrdemVenda;
};

const Card = ({ ordemVenda }: CardProps) => {
  const total = useMemo(
    () =>
    ordemVenda.produtos?.reduce(
        (accumulator, object) => accumulator + object.valor_Venda,
        0
      ),
    [ordemVenda.produtos]
  );

  const view = () => {
    window.open(`/print/${ordemVenda.id}`, "_blank");
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-[#1a3a31] dark:border-gray-700">
      <div className="flex justify-between items-center w-full mb-2">
        <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {ordemVenda.referencia}
        </h5>
        <Badge status={ordemVenda.status || EOrdemVendaStatus.pendente} />
        <button
            title="Visualizar"
            type="button"
            onClick={() => view()}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-3 h-3 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
              <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
            </svg>
          </button>
      </div>
      <div className="flex flex-wrap gap-x-5">
        <p className="mb-4 text-gray-700 dark:text-gray-400 ">
          <span className="font-bold">{currencyFormat(total)}</span>
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-400">
          <span className="font-bold"> Cpf:</span> {cpfFormater(ordemVenda.cpf)}
        </p>
      </div>
      {ordemVenda.produtos.length > 0 ? (
        <div className="block mt-2">
          <h4 className="text-gray-700 dark:text-gray-400 font-bold">
            Produtos
          </h4>
          <ListProdutos produtos={ordemVenda.produtos} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
