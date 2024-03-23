import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../../../pages/service";
import { useHookFormMask } from "use-mask-input";

type FormPros = {
    register: UseFormRegister<FormValues>
}

const Form = ({ register }: FormPros) => {
    const registerWithMask = useHookFormMask(register);
    return (
        <form className="w-full">
            <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
                <div>
                    <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                    <input   {...registerWithMask("cpf", "cpf", {
                        valueAsNumber: false,
                        required: true,
                    })} autoFocus type="text" id="customer_cpf" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>

            </div>
        </form>

    );
}

export default Form;