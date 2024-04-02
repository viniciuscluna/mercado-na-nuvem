import { useEffect, useMemo, useState } from "react";

import { Control, SubmitHandler, UseFieldArrayAppend, useForm } from "react-hook-form";
import SelectFilter from "../../selectFilter";
import { FormValues, Product } from "../../../pages/service";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { useQuery } from "@tanstack/react-query";
import { getAllGroupByProduct } from "../../../services/produtoService";
import { useHookFormMask } from "use-mask-input";
import { useNotificationStore } from "../../../stores/notificationStore";

type FormProps = {
    control: Control<FormValues, any>;
    addProduct: UseFieldArrayAppend<FormValues, "products">;
    port: SerialPort | undefined;
}

const Form = ({ addProduct, port }: FormProps) => {
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const setIsProductOpened = useIncludeServiceStore(state => state.setIsProductOpened);

    const { data: produtos } = useQuery({
        queryKey: ["sell/products"],
        queryFn: () => getAllGroupByProduct("", "", ""),
    })

    const noProducts = useMemo(() => produtos?.length === 0, [produtos]);

    const isNewSellOpened = useIncludeServiceStore(
        (state) => state.isNewSellOpened
    );

    const { register, handleSubmit, reset, setFocus, setValue, watch, getValues, control } = useForm<Product>();
    const registerWithMask = useHookFormMask(register);

    const addNotification = useNotificationStore(
        (state) => state.addNotification
      );

    useEffect(() => {
        if (!isNewSellOpened) {
            setFocus('produto')
        }
    }, [isNewSellOpened]);

    useEffect(() => {
        if (noProducts) {
            setAvailableQuantity(500);
        }
    }, [noProducts])

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "produto") {
                if (Array.isArray(produtos)) {
                    const produtoFilter = produtos?.find(f => f.id == value.produto);
                    setValue("nome", produtoFilter?.nome || '');
                    setValue("unitario", produtoFilter?.valor_Venda || 0);
                    setValue("quantidade", 1);
                    setValue("total", produtoFilter?.valor_Venda || 0);
                    setValue('peso', 0)
                    setAvailableQuantity(produtoFilter?.qtd || 1);
                }
            }
            if (name === "unitario" || name === 'quantidade') {
                const unitario = getValues("unitario")
                const quantidade = getValues("quantidade");


                if (unitario && quantidade)
                    setValue("total", unitario * quantidade)
            }
        });
        return () => subscription.unsubscribe()
    }, [watch, produtos])



    useEffect(() => {
        if (port) {
            const initializeConnection = async () => {

                await port.open({ baudRate: 4800, dataBits: 8, stopBits: 1, parity: 'none', flowControl: 'none' });
                const textDecoder = new TextDecoderStream();
                port.readable.pipeTo(textDecoder.writable);
                const reader = textDecoder.readable.getReader();

                // Listen to data coming from the serial device.
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        // Allow the serial port to be closed later.
                        reader.releaseLock();
                        break;
                    }
                    const encoder = new TextEncoder();
                    // Convertendo a string para ArrayBuffer
                    const encodedValue = encoder.encode(value);
                    // Convertendo os bytes em uma string
                    const stringValue = new TextDecoder().decode(encodedValue);
                    //Pega apenas os números com vírgula
                    const matches = stringValue.match(/\b\d+.\d+\b/g);

                    if (matches) {
                        // Iterando sobre os valores encontrados
                        matches.forEach(match => {
                            setValue('peso', Number(match));
                            // Faça algo com cada valor encontrado
                        });
                    }
                }


            }

            initializeConnection();
        }
    }, [port]);

    const onSubmit: SubmitHandler<Product> = (data) => {
        if (Array.isArray(produtos)) {
            const productFilter = produtos.find(f => f.id === data.produto);
    
        if (data.nome == '' || undefined) {
            addNotification({
                message: "Por favor selecione um produto.",
                type: "error"
              })
        }else{
            addProduct({ ...data, modelo: productFilter?.modelo || '', marca: productFilter?.marca || ''});
                reset();
        }
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-4 w-full">
                {Array.isArray(produtos) && produtos &&
                    <div>
                        <label htmlFor="produto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pesquisar Produto</label>
                        <SelectFilter name="produto" values={produtos.map(item => ({ name: `${item.nome} ${item.modelo} - ${item.marca}` || '', value: item.id || '' }))} searchPlaceholder="Selecione o Produto" emptyPlaceholder="Selecione" search="" control={control} />
                    </div>
                }
                <div>
                    <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input readOnly={!noProducts} {...register("codigo")} autoFocus type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                    <input readOnly={!noProducts} {...register('nome')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                             </div>
                <div>
                    <label htmlFor="quantidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
                    <input {...register('quantidade')} type="number" min={availableQuantity === 0 ? 0 : 1} max={availableQuantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-4 w-full">
                <div>
                    <label htmlFor="unitario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Unitário</label>
                    <input {...registerWithMask('unitario', 'currency', { radixPoint: ',', autoUnmask: true, unmaskAsNumber: true, prefix: 'R$ ', placeholder: '0,00' })} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                    <input {...registerWithMask('total', 'currency', { radixPoint: ',', autoUnmask: true, unmaskAsNumber: true, prefix: 'R$ ', placeholder: '0,00' })} readOnly type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso</label>
                    <input {...register('peso')} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <br />
                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Adicionar a Venda</button>
                    <button type="button" onClick={() => setIsProductOpened(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Novo Produto</button>
                </div>
            </div>
        </form>
    )
}

export default Form;