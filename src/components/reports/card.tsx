import { useMemo } from "react";

import Badge from "./badge";
import ListProdutos from "./listProdutos";
import { currencyFormat } from "../../utils/currencyFormater";
import { OrdemVenda } from "../../domain/ordemVenda";
import { EOrdemVendaStatus } from "../../domain/eOrdemVendaStatus";

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


  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center w-full mb-2">
        <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {ordemVenda.referencia}
        </h5>
        <Badge status={ordemVenda.status || EOrdemVendaStatus.pendente} />
      </div>
      <div className="flex flex-wrap gap-x-5">
        <p className="mb-3 text-gray-700 dark:text-gray-400 ">
          <span className="font-bold">{currencyFormat(total)}</span>
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          <span className="font-bold"> Cliente:</span> {ordemVenda.cpf}
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
