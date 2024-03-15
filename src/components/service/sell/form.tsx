import { Control, SubmitHandler, UseFieldArrayAppend, useForm } from "react-hook-form";
import SelectFilter from "../../selectFilter";
import { FormValues, Product } from "../../../pages/service";
import { useEffect } from "react";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";

type FormProps = {
    control: Control<FormValues, any>;
    addProduct: UseFieldArrayAppend<FormValues, "products">;
}

const Form = ({ control, addProduct }: FormProps) => {
    const isNewSellOpened = useIncludeServiceStore(
        (state) => state.isNewSellOpened
      );
    const { register, handleSubmit, reset, setFocus } = useForm<Product>();
    
    useEffect(() => {
        if(!isNewSellOpened){
            setFocus('codigo')
        }
    }, [isNewSellOpened]);
    const onSubmit: SubmitHandler<Product> = (data) => { 
        addProduct(data); 
        reset();
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-4 w-full">
                <div>
                    <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input {...register("codigo")} autoFocus type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                    <input {...register('nome')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="quantidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
                    <input {...register('quantidade')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="produto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pesquisar Produto</label>
                    <SelectFilter name="produto" values={[]} searchPlaceholder="Selecione o Produto" emptyPlaceholder="Selecione" search="" control={control} />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-4 w-full">
                <div>
                    <label htmlFor="unitario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Unitário</label>
                    <input {...register('unitario')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                    <input {...register('total')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Incluir Produto</button>
                </div>
            </div>
        </form>
    )
}

export default Form;