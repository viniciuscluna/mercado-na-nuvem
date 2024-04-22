import { useForm } from "react-hook-form";
import { Produto } from "../../domain/produto";
import { useHookFormMask } from "use-mask-input";

type ProductFormProps = {
  submitCallback: (produto: Produto) => void;
  backCallback: () => void;
  defaultValues?: Produto;
  label: string;
  editMode: boolean;
};

const ProdutoForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
}: ProductFormProps) => {
  const { register, handleSubmit } = useForm<Produto>({
    defaultValues: defaultValues,
  });
  const registerWithMask = useHookFormMask(register);

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className="mb-6">
        <label
          htmlFor="nome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Nome*
        </label>
        <input
          {...register("nome", { required: true })}
          type="text"
          id="nome"
          maxLength={150}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="marca"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Marca*
        </label>
        <input
          {...register("marca", { required: true })}
          type="text"
          id="marca"
          maxLength={150}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="modelo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Modelo*
        </label>
        <input
          type="text"
          id="modelo"
          {...register("modelo")}
          maxLength={200}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>      
      <div className="mb-6">
        <label
          htmlFor="valor_Compra"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Valor Compra*
        </label>
        <input
          type="text"
          id="valor_Compra"
          min={0}
          {...registerWithMask("valor_Compra", 'currency', { radixPoint: ',', autoUnmask: true, unmaskAsNumber: true, prefix: 'R$ ', placeholder: '0,00' })}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="valor_Venda"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Valor Venda*
        </label>
        <input
          type="text"
          id="valor_Venda"
          {...registerWithMask("valor_Venda", 'currency', { radixPoint: ',', autoUnmask: true, unmaskAsNumber: true, prefix: 'R$ ', placeholder: '0,00' })}
          min={0}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="tipoMedida"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Tipo Medida*
        </label>
        <select
          id="tipoMedida"
          {...register("tipoMedidaItem", { valueAsNumber: true })}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="0">Litro</option>
          <option value="1">Unidade</option>
          <option value="3">Kilo/Grama</option>
        </select>
      </div>      
      <div className="mb-6">
          <label
            htmlFor="quantidade"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
          >
            Quantidade*
          </label>
          <input
            type="number"
            min={1}
            id="quantidade"
            {...register("qtd", { required: true, valueAsNumber: true })}
            className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      <div className="mb-6">
        <label
          htmlFor="data_validade"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Data Validade
        </label>
        <input
          type="date"
          id="data_validade"
          {...register("data_validade", { valueAsDate: true })}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="garantia"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Garantia
        </label>
        <input
          type="text"
          id="garantia"
          maxLength={200}
          {...register("garantia")}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31]dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => backCallback()}
        >
          Voltar
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {label}
        </button>
      </div>
    </form>
  );
};

export default ProdutoForm;
