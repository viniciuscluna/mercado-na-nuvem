import { EOrdemVendaStatus } from "../../domain/eOrdemVendaStatus";

type BadgeProps = {
  status: EOrdemVendaStatus;
};

const Badge = ({ status }: BadgeProps) => {
  switch (status) {
    case EOrdemVendaStatus.aberto:
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          Aberto
        </span>
      );
    case EOrdemVendaStatus.pendente:
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          Pendente
        </span>
      );
    case EOrdemVendaStatus.cancelado:
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Rejeitado
        </span>
      );
    case EOrdemVendaStatus.concluido:
      return (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
          Concluído
        </span>
      );
  }
};

export default Badge;
