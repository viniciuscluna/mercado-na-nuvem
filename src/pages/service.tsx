
import New from "../components/service/new/new";
import Form from "../components/service/sell/form";
import List from "../components/service/sell/list";
import Shortcuts from "../components/service/sell/shortcuts";
import Total from "../components/service/sell/total";
import useKeypress from "../hooks/useKeyPress";
import { useIncludeServiceStore } from "../stores/includeServiceStore";

const Service = () => {
  const setIsNewSellOpened = useIncludeServiceStore(
    (state) => state.setIsNewSellOpened
  );
  

  useKeypress('Escape', () => setIsNewSellOpened(true));
  useKeypress('F2', () => alert('Finaliza Venda'));
  useKeypress('F9', () => alert('Cancela Venda'));

  return (
    <>
      <div className="flex justify-between items-center flex-col h-full">
        <h2 className="text-3xl font-extrabold dark:text-white my-6">
          Venda de Produtos
        </h2>
        <Shortcuts />
        <Form />
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="col-span-2">
            <List />
          </div>
          <Total />
        </div>
        <div className="flex gap-6 justify-between my-6">
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar Venda</button>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Finalizar Venda</button>
        </div>
      </div>
      <New />
    </>
  );
};

export default Service;
