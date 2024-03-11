import { useForm } from "react-hook-form";
import SelectFilter from "../../selectFilter";

const Form = () => {
    const { control } =
        useForm({
            defaultValues: {},
        });

    return (
        <form className="w-full">
            <div className="grid gap-6 mb-6 md:grid-cols-4 w-full">
                <div>
                    <label htmlFor="product_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input autoFocus type="text" id="product_code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                    <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                    <input type="text" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                </div>
                <div>
                    <label htmlFor="product_quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
                    <input type="text" id="product_quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                    <label htmlFor="product_search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pesquisar Produto</label>
                    <SelectFilter name="product_search" values={[]} searchPlaceholder="Selecione o Produto" emptyPlaceholder="Selecione" search="" control={control} />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-4 w-full">
                <div>
                    <label htmlFor="product_value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Unitário</label>
                    <input type="text" id="product_value" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                    <label htmlFor="product_total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                    <input type="text" id="product_total" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                </div>
            </div>
        </form>
    )
}

export default Form;