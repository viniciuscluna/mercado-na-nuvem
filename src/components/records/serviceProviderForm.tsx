import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

import { getAll } from "../../services/filialService";
import { useQuery } from "@tanstack/react-query";
import { Prestador } from "../../domain/prestador";

type ServiceProviderFormProps = {
  submitCallback: (prestador: Prestador) => void;
  backCallback: () => void;
  defaultValues?: Prestador;
  label: string;
};

const ServiceProviderForm = ({
  submitCallback,
  backCallback,
  defaultValues,
  label,
}: ServiceProviderFormProps) => {
  const { register, handleSubmit } = useForm<Prestador>({
    defaultValues: defaultValues,
  });

  const { } = useQuery({
    queryKey: ["employee"],
    queryFn: () => getAll("", ""),
  });

  const registerWithMask = useHookFormMask(register);

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700">
          Tip. Cadastro*
        </label>
        <select
          className="block p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("tipoCadastro", { valueAsNumber: true })}
        >
          <option value="0">
            Cpf
          </option>
          <option value="1">
            Cnpj
          </option>
        </select>
      </div>
      <div className="mb-6 mr-1.5 inline-block">
        <label
          htmlFor="nome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Nome*
        </label>
        <input
          {...register("nome", { required: true })}
          maxLength={150}
          type="text"
          id="nome"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-96 py-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6 mr-1.5 inline-block">
        <label
          htmlFor="cpf"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Cpf*
        </label>
        <input
          {...registerWithMask("cpf", "cpf", {
            required: true,
          })}
          type="text"
          id="cpf"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-24 p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6 inline-block">
        <label
          htmlFor="telefone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Telefone*
        </label>
        <input
          {...registerWithMask("telefone", ["(99) [9]9999-9999"], {
            required: true,
          })}
          type="text"
          id="telefone"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-24 py-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="endereco"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Endereço*
        </label>
        <input
          {...register("endereco", { required: true })}
          type="text"
          id="endereco"
          maxLength={250}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="emailEmpresa"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Email Empresa*
        </label>
        <input
          {...registerWithMask("emailEmpresa", "email", { required: true })}
          type="text"
          id="emailEmpresa"
          maxLength={250}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="logo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Logo
        </label>
        <input
          {...register("logo")}
          type="text"
          id="logo"
          maxLength={100}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="cpfRepresentante"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Cpf Representante
        </label>
        <input
          {...registerWithMask("cpfRepresentante", "cpf", { required: false })}
          type="text"
          id="cpfRepresentante"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="nomeRepresentante"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Nome Representante
        </label>
        <input
          {...register("nomeRepresentante")}
          type="text"
          id="nomeRepresentante"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="emailRepresentante"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Email Representante
        </label>
        <input
          {...registerWithMask("emailRepresentante", "email")}
          type="text"
          id="emailRepresentante"
          maxLength={250}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="cnpj"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Cnpj
        </label>
        <input
          {...registerWithMask("cnpj", ["99.999.999/9999-99"])}
          type="text"
          id="cnpj"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="razaoSocial"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Razão Social
        </label>
        <input
          {...register("razaoSocial")}
          type="text"
          id="razaoSocial"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="nomeFantasia"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Nome Fantasia
        </label>
        <input
          {...register("nomeFantasia")}
          type="text"
          id="nomeFantasia"
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="situacaoCadastral"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700">
          Situação Cadastral
        </label>
        <select
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#1a3a31] focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("situacaoCadastral")}
          id="situacaoCadastral"
        >
          <option key="0" value="0">
            Ativo
          </option>
          <option key="1" value="1">
            Inativo
          </option>
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="dataAbertura"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Data Abertura
        </label>
        <input
          type="date"
          id="dataAbertura"
          {...register("dataAbertura")}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="dataCadastro"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-700"
        >
          Data Cadastro
        </label>
        <input
          type="date"
          id="dataCadastro"
          {...register("dataCadastro", { valueAsDate: true })}
          className="bg-[#1a3a31] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default ServiceProviderForm;
