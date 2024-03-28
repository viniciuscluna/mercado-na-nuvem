
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import New from "../components/service/new/new";
import Form from "../components/service/sell/form";
import List from "../components/service/sell/list";
import Shortcuts from "../components/service/sell/shortcuts";
import Total from "../components/service/sell/total";
import useKeypress from "../hooks/useKeyPress";
import { useIncludeServiceStore } from "../stores/includeServiceStore";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { add } from "../services/ordemVendaService";
import { Produto } from "../domain/produto";
import { useNotificationStore } from "../stores/notificationStore";
import Add from "../components/service/product/add";

export type Product = {
  codigo: string;
  nome: string;
  quantidade: number;
  unitario: number;
  total: number;
  produto: string;
  peso: number;
}
export type FormValues = {
  cpf: string;

  products: Product[];
}

const toProduct = (product: Product): Produto => {
  return ({
    ...product,
    marca: '',
    valor_Compra: product.total,
    valor_Venda: product.total,
    qtd: product.quantidade,
  })
}
const Service = () => {
  const setIsNewSellOpened = useIncludeServiceStore(
    (state) => state.setIsNewSellOpened
  );
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const [port, setPort] = useState<SerialPort | undefined>(undefined);

  const { setFocus, control, getValues, watch, reset, register } = useForm<FormValues>({
    defaultValues: {
      products: []
    }
  });

  const { fields, append: appendProduct, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "products", // unique name for your Field Array
  });

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: add
  })

  const products = watch('products');
  const total = useMemo(() => products.map(p => p.total).reduce((sum, current) => sum + current, 0), [products]);


  useEffect(() => {
    if (isSuccess) {
      addNotification({
        type: 'success',
        message: 'Venda Realizada'
      });
      reset();
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submit = {
      cpf: data.cpf,
      produtos: data.products.map(product => (toProduct(product)))
    };
    mutateAsync(submit);
    reset();
  }

  useKeypress('Escape', () => setIsNewSellOpened(true));
  useKeypress('F2', () => onSubmit(getValues()));
  useKeypress('F9', () => alert('Cancela Venda'));

  return (
    <>
      <div className="flex justify-between items-center flex-col h-full">
        <h2 className="text-3xl font-extrabold dark:text-white my-6">
          Venda de Produtos
        </h2>
        <Shortcuts />
        <Form control={control} addProduct={appendProduct} port={port} />
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="col-span-2">
            <List products={fields} remove={remove} />
          </div>
          <Total total={total} />
        </div>
        <div className="flex gap-6 justify-between my-6">
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar Venda</button>
          <button type="button" onClick={() => onSubmit(getValues())} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Finalizar Venda</button>
        </div>
      </div>
      <New setFocus={setFocus} setPort={setPort} port={port} register={register} />
      <Add />
    </>
  );
};

export default Service;
