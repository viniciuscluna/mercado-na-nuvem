import classNames from "classnames";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import { useNotificationStore } from "../../../stores/notificationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add } from "../../../services/produtoService";
import { Produto } from "../../../domain/produto";
import Loader from "../../loader";
import ProductForm from "../../records/productForm";
import { ETipoMedidaItem } from "../../../domain/ETipoMedidaItem";

const Add = () => {
    const isOpened = useIncludeServiceStore(state => state.isProductOpened);
    const setIsOpened = useIncludeServiceStore(state => state.setIsProductOpened);
    const queryClient = useQueryClient();

    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );

    const produtoResult = useMutation({
        mutationFn: add,
        onSuccess: () => {
            setIsOpened(false);
            queryClient.refetchQueries({queryKey: ["sell/products"]})
            addNotification({
                message: "Produto inserido!",
                type: "success",
            });
        },
        onError: () => {
            addNotification({
                message: "Erro ao inserir produto.",
                type: "error"
            })
        }
    });

    const onSubmit = (produto: Produto) => {
        produtoResult.mutateAsync(produto);
    };

    return (
        <>
            <div
                tabIndex={-1}
                className={classNames(
                    "fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex",
                    isOpened ? "" : "hidden overflow-x-hidden"
                )}
            >
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Novo Produto
                            </h3>
                            <button type="button" id="add-service" onClick={() => setIsOpened(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Fechar modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            {produtoResult.isPending ? (
                                <Loader />
                            ) : (
                                <ProductForm
                                    backCallback={() => setIsOpened(false)}
                                    submitCallback={onSubmit}
                                    defaultValues={
                                        { tipoMedidaItem: ETipoMedidaItem.Litro, qtd: 1 } as Produto
                                    }
                                    label="Adicionar"
                                    editMode={false}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpened ? (
                    <div
                        modal-backdrop=""
                        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
                    ></div>
                ) : (
                    <></>
                )
            }
        </>
    );
}

export default Add;