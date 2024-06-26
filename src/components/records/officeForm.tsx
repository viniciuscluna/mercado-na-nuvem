import { useForm } from "react-hook-form";
import { FilialServico } from "../../domain/filialServico";
import { useHookFormMask } from "use-mask-input";

type OfficeFormProps = {
  submitCallback: (filial: FilialServico) => void;
  backCallback: () => void;
  defaultValues?: FilialServico;
  label: string;
};

const OfficeForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
}: OfficeFormProps) => {
  const { register, handleSubmit } = useForm<FilialServico>({
    defaultValues: defaultValues,
  });
  const registerWithMask = useHookFormMask(register);
  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className="grid gap-2 mb-6 md:grid-cols-2 w-full">
        <div className="mr-3">
        <label
          htmlFor="nome"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Nome*
        </label>
        <input
          {...register("nome", { required: true })}
          maxLength={250}
          type="text"
          id="nome"
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
       <div>
        <label
          htmlFor="logradouro"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Logradouro*
        </label>
        <input
          type="text"
          id="logradouro"
          {...register("logradouro", { required: true })}
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
      </div>
      <div className="grid gap-3 mb-6 md:grid-cols-3 w-full">
        <div className="mr-3">
        <label
          htmlFor="cep"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          CEP*
        </label>
        <input
          type="text"
          id="cep"
          {...registerWithMask("cep", ["99999-999"], { required: true })}
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
       <div>
        <label
          htmlFor="numero"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Número*
        </label>
        <input
          type="text"
          id="numero"
          {...register("numero", { required: true })}
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
       
       <div className="text-center mt-2">
        <label
          htmlFor="matriz"
          className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Matriz?
        </label>
        <div className="text-center">
          <input
            {...register("matriz", { setValueAs: Boolean })}
            type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-[#1a3a31] dark:border-gray-600" />

        </div>
       </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="observacao"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Observação*
        </label>
        <input
          type="text"
          id="observacao"
          {...register("observacao", { required: true })}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="p-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-[#1a3a31]"
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

export default OfficeForm;
