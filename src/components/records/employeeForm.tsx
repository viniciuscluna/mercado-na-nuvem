import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

import { FuncionarioPrestador } from "../../domain/funcionarioPrestador";
import { getAll } from "../../services/filialService";
import { useQuery } from "@tanstack/react-query";

type EmployeeFormProps = {
  submitCallback: (funcionario: FuncionarioPrestador) => void;
  backCallback: () => void;
  defaultValues?: FuncionarioPrestador;
  label: string;
};

const EmployeeForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
}: EmployeeFormProps) => {
  const { register, handleSubmit } = useForm<FuncionarioPrestador>({
    defaultValues: defaultValues,
  });

  const { data } = useQuery({
    queryKey: ["employee"],
    queryFn: () =>  getAll("", ""),
  });

  const registerWithMask = useHookFormMask(register);
  
  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className="grid gap-4 mb-6 md:grid-cols-4 w-full">
       <div className="mr-3">
        <label
          htmlFor="nome"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Nome*
        </label>
        <input
          {...register("nome", { required: true })}
          maxLength={150}
          type="text"
          id="nome"
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
       <div className="mr-3">
        <label
          htmlFor="telefone"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Telefone*
        </label>
        <input
          {...registerWithMask("telefone", ["(99) [9]9999-9999"], {
            required: true,
          })}
          type="text"
          id="telefone"
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
       <div className="mr-3">
        <label
          htmlFor="rg"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          RG*
        </label>
        <input
          {...registerWithMask("rg", ["99999999-9"], { required: true })}
          type="text"
          id="rg"
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
       </div>
       <div>
        <label
          htmlFor="cpf"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          CPF*
        </label>
        <input
          {...registerWithMask("cpf", "cpf", {
            valueAsNumber: false,
            required: true,
          })}
          type="text"
          id="cpf"
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
    <div className="grid gap-4 mb-6 md:grid-cols-4 w-full">
      <div className="mr-3">
        <label
          htmlFor="email"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Email*
        </label>
        <input
          {...registerWithMask("email", "email", { required: true })}
          type="text"
          id="email"
          maxLength={250}
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mr-3">
        <label
          htmlFor="endereco"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Endereço*
        </label>
        <input
          {...register("endereco", { required: true })}
          type="text"
          id="endereco"
          maxLength={250}
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mr-3">
        <label
          htmlFor="cargo"
          className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Cargo*
        </label>
        <input
          {...register("cargo", { required: true })}
          type="text"
          id="cargo"
          maxLength={100}
          className="w-full bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-green-700">
          Filial*
        </label>
        <select
          className="w-full block p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#1a3a31] focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("filialId")}
        >          
          {
          Array.isArray(data) && data?.map((filial) => (
            <option key={filial.id} value={filial.id}>
              {filial.nome}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-[#1a3a31]"
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

export default EmployeeForm;
