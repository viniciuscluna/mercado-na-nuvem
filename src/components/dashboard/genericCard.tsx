import { currencyFormat } from "../../utils/currencyFormater";

type GenericCardPros = {
  label: string;
  amount: number;
  useCurrency?: boolean;
  icon: string;
};

const GenericCard = ({
  label,
  amount,
  useCurrency = true,
  icon,
}: GenericCardPros) => {
  let iconComponent = null;

  switch (icon) {
    case "maos-usd":
      iconComponent = (
        <svg
          className="fill-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="30"
          height="30"
        >
          <path d="M8,3.62c0-1.45,1.18-2.62,2.62-2.62h.38c0-.55,.45-1,1-1s1,.45,1,1h.27c1.07,0,2.06,.57,2.6,1.5,.28,.48,.11,1.09-.36,1.37-.48,.28-1.09,.11-1.37-.36-.18-.31-.51-.5-.87-.5h-2.64c-.34,0-.62,.28-.62,.62,0,.31,.22,.57,.52,.62l3.28,.55c1.27,.21,2.19,1.3,2.19,2.59,0,1.45-1.18,2.62-2.62,2.62h-.38c0,.55-.45,1-1,1s-1-.45-1-1h-.27c-1.07,0-2.06-.57-2.6-1.5-.28-.48-.11-1.09,.36-1.37,.48-.28,1.09-.11,1.37,.36,.18,.31,.51,.5,.87,.5h2.64c.34,0,.62-.28,.62-.62,0-.31-.22-.57-.52-.62l-3.28-.55c-1.27-.21-2.19-1.3-2.19-2.59Zm12.4-.57c-1.42,.28-2.4,1.61-2.4,3.06v5.05c-.26-.09-.54-.15-.83-.17-.79-.04-1.57,.23-2.17,.77l-3,2.76c-.08-.08-.17-.17-.25-.25l-2.74-2.52c-.6-.54-1.38-.81-2.16-.76-.29,.02-.57,.07-.83,.17V6c0-1.85-1.68-3.31-3.6-2.94-1.42,.28-2.4,1.61-2.4,3.06v9.98c0,2.12,.84,4.16,2.34,5.66l1.95,1.95c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29c.39-.39,.39-1.02,0-1.41l-1.95-1.95c-1.13-1.13-1.76-2.65-1.76-4.24V6c0-.55,.45-1,1-1s1,.45,1,1c0,0,0,8.13,.02,8.19,.04,.63,.28,1.26,.73,1.78l2.62,2.72c.38,.4,1.01,.41,1.41,.03,.4-.38,.41-1.02,.03-1.41l-2.57-2.67c-.32-.38-.31-.94,.02-1.31,.18-.2,.42-.32,.69-.33,.27-.01,.52,.08,.71,.25l2.73,2.52c1.03,.95,1.61,2.28,1.61,3.68v3.56c0,.55,.45,1,1,1s1-.45,1-1v-3.56c0-1.15-.29-2.28-.82-3.28l3.07-2.87c.39-.36,.98-.36,1.38-.01,.43,.39,.45,1.05,.05,1.46l-2.4,2.48c-.38,.4-.37,1.03,.03,1.41,.19,.19,.44,.28,.69,.28,.26,0,.52-.1,.72-.31l2.58-2.68c.44-.52,.67-1.16,.69-1.8,0-.04,0-8.12,0-8.12,0-.55,.45-1,1-1s1,.45,1,1v10.1c0,1.59-.63,3.12-1.76,4.24l-1.95,1.95c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29l1.95-1.95c1.5-1.5,2.34-3.53,2.34-5.66V6c0-1.85-1.68-3.31-3.6-2.94Z"
          />
        </svg>
      );
      break;

      case "receita":
      iconComponent = (
        <svg
          className="fill-green-400"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="30"
          height="30"
        >
          <path d="M17,12h-4v-2h4v2Zm0,3h-6v2h6v-2Zm4,6V2h-5.171c-.413-1.164-1.525-2-2.829-2h-2c-1.304,0-2.416,.836-2.829,2H3V21c0,1.654,1.346,3,3,3h12c1.654,0,3-1.346,3-3ZM10,4v-1c0-.551,.449-1,1-1h2c.551,0,1,.449,1,1v1h5V21c0,.551-.449,1-1,1H6c-.551,0-1-.449-1-1V4h5Zm-1,11h-2v2h2v-2Zm.838-3.481l2.759-2.702-1.399-1.429-2.533,2.48-1.241-1.192-1.386,1.442,1.45,1.393c.326,.326,.754,.488,1.181,.488,.425,0,.848-.161,1.168-.481ZM3.008,2.718v.011l.017-.006-.017-.006ZM11.008,23.905V11.617l-.46,.766c-.742,1.236-2.044,1.945-3.415,1.945-.425,0-.856-.067-1.28-.209l-3.845-1.281v4.558c0,2.152,1.377,4.063,3.419,4.743l4.435,1.478c.374,.121,.758,.22,1.146,.287ZM23.728,7.596l-1.148-1.913c-.334-.557-1.011-.808-1.628-.602l-7.945,2.648,2.175,3.624c.482,.804,1.458,1.165,2.347,.868l5.118-1.706c1.211-.404,1.737-1.825,1.08-2.92Zm-6.845,6.733c-1.371,0-2.673-.708-3.415-1.945l-.46-.766v12.282c.422-.074,.84-.182,1.236-.314h.01l4.335-1.446c2.042-.681,3.419-2.591,3.419-4.743v-4.559l-3.845,1.282c-.424,.142-.855,.209-1.28,.209Z"
          />
        </svg>
      );
      break;

      case "clientes":
      iconComponent = (
        <svg
          className="fill-orange-400"
          id="Layer_1"
          height="30"
          viewBox="0 0 24 24"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <path d="m7.5 13a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm7.5 7a5.006 5.006 0 0 0 -5-5h-5a5.006 5.006 0 0 0 -5 5v4h15zm2.5-11a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm1.5 2h-5a4.793 4.793 0 0 0 -.524.053 6.514 6.514 0 0 1 -1.576 2.216 7.008 7.008 0 0 1 5.1 6.731h7v-4a5.006 5.006 0 0 0 -5-5z" />
        </svg>
      );
      break;

      case "produtos":
      iconComponent = (
        <svg
          className="fill-cyan-400"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="30"
          height="30"
        >
          <path d="M12.016,5.731L3.025,2.724,10.427,.257c1.026-.342,2.136-.342,3.162,0l7.419,2.473-8.992,3.001Zm-3.182,5.623l2.175-3.624L3.063,5.081c-.617-.206-1.293,.045-1.628,.602L.308,7.563c-.667,1.112-.133,2.555,1.097,2.965l5.081,1.694c.889,.296,1.865-.065,2.347-.868ZM3.008,2.718v.011l.017-.006-.017-.006ZM11.008,23.905V11.617l-.46,.766c-.742,1.236-2.044,1.945-3.415,1.945-.425,0-.856-.067-1.28-.209l-3.845-1.281v4.558c0,2.152,1.377,4.063,3.419,4.743l4.435,1.478c.374,.121,.758,.22,1.146,.287ZM23.728,7.596l-1.148-1.913c-.334-.557-1.011-.808-1.628-.602l-7.945,2.648,2.175,3.624c.482,.804,1.458,1.165,2.347,.868l5.118-1.706c1.211-.404,1.737-1.825,1.08-2.92Zm-6.845,6.733c-1.371,0-2.673-.708-3.415-1.945l-.46-.766v12.282c.422-.074,.84-.182,1.236-.314h.01l4.335-1.446c2.042-.681,3.419-2.591,3.419-4.743v-4.559l-3.845,1.282c-.424,.142-.855,.209-1.28,.209Z"/>
          </svg>
      );
      break;
    }

  return (
    <div className="block w-full text-center grid grid-cols-2 p-4 mbg-white border border-gray-200 rounded-lg shadow hover:bg-[#1a3a30e6] dark:bg-[#00593E] dark:border-gray-700 dark:hover:bg-[#1a3a30e6]">
      <div className="flex items-center justify-center align-middle fill-zinc-800">
       {iconComponent}
      </div>
        <div>
          <h5 className="w-13 font-bold tracking-tight text-gray-900 dark:text-zinc-400">
            {label}
          </h5>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {useCurrency
              ? currencyFormat(amount)
              : amount}
          </h2>
        </div>
    </div>
  );
};

export default GenericCard;
