
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import New from "../components/service/new/new";
import Form from "../components/service/sell/form";
import List from "../components/service/sell/list";
import Shortcuts from "../components/service/sell/shortcuts";
import Total from "../components/service/sell/total";
import useKeypress from "../hooks/useKeyPress";
import { useIncludeServiceStore } from "../stores/includeServiceStore";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { add } from "../services/ordemVendaService";
import { Produto } from "../domain/produto";
import { useNotificationStore } from "../stores/notificationStore";
import Add from "../components/service/product/add";
import { OrdemVenda } from "../domain/ordemVenda";
import { EOrdemVendaStatus } from "../domain/eOrdemVendaStatus";
import ConfirmSellModal from "../components/service/sellConfirm/modal";

export type Product = {
  codigo: string;
  nome: string;
  quantidade: number;
  unitario: number;
  total: number;
  produto: string;
  peso: number;
  modelo: string;
  marca: string;
}
export type FormValues = {
  cpf: string;
  pesarBalanca: boolean;
  email: string;
  products: Product[];
}

const toProduct = (product: Product): Produto => {
  return ({
    ...product,
    valor_Compra: product.total,
    valor_Venda: product.total,
    qtd: product.quantidade,
  })
}
const Service = () => {
  const setIsNewSellOpened = useIncludeServiceStore(
    (state) => state.setIsNewSellOpened
  );
  const setIsConfirmSellOpened = useIncludeServiceStore(
    (state) => state.setIsConfirmSellOpened
  );
  const isConfirmSellOpened = useIncludeServiceStore(
    (state) => state.isConfirmSellOpened
  );
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const [port, setPort] = useState<SerialPort | undefined>(undefined);

  const { setFocus, control, getValues, watch, reset, register } = useForm<FormValues>({
    defaultValues: {
      products: [],
      pesarBalanca: true
    }
  });

  const { fields, append: appendProduct, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "products", // unique name for your Field Array
  });

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: add,
    onSuccess: () => {
      addNotification({
        type: 'success',
        message: 'Venda Realizada'
      });
      reset();
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Erro ao inserir venda :('
      });
    }
  })

  const products = watch('products');
  const total = useMemo(() => products.map(p => p.total).reduce((sum, current) => sum + current, 0), [products]);

  const onSubmit: SubmitHandler<FormValues> = () => {
    setIsConfirmSellOpened(true);
  }

  const onFinishSell = () => {
    const data = getValues();
    const submit: OrdemVenda = {
      cpf: data.cpf,
      email: data.email,
      produtos: data.products.map(product => (toProduct(product))),
      status: EOrdemVendaStatus.aberto,
      referencia: ''
    };
    mutateAsync(submit);
    reset();
  }

  const onCancel = () => {
    reset();
    setIsNewSellOpened(true)
  }

  useKeypress('Escape', () => !isConfirmSellOpened ? onCancel() : console.log('not allowed'));
  useKeypress('F2', () => !isConfirmSellOpened ? onSubmit(getValues()) : console.log('not allowed'));

  return (
    <>
      <div className="flex justify-between items-center flex-col h-full">
        <h2 className="text-3xl font-extrabold dark:text-white my-6">
          <span className="text-transparent dark:text-sky-950" style={{ textShadow: '0 0 4px black' }}>Venda de Produtos</span>
        </h2>
        <Shortcuts />
        <Form control={control} addProduct={appendProduct} port={port} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div>
            <List products={fields} remove={remove} />
          </div>
          <div>
            <Total total={total} />
          </div>
        </div>
        <div className="flex gap-6 justify-between my-6">
          <button type="button" onClick={() => onCancel()} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Limpar Venda (ESC)</button>
          <button type="button" onClick={() => onSubmit(getValues())} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Finalizar Venda (F2)</button>
        </div>
      </div>
      <New setFocus={setFocus} setPort={setPort} port={port} register={register} getValues={getValues} />
      <Add />
      <ConfirmSellModal
        register={register}
        isLoading={isLoading}
        setFocus={setFocus}
        onCancel={() => setIsConfirmSellOpened(false)}
        onSubmit={() => onFinishSell()}
      />
    </>
  );
};

export default Service;
