import classNames from "classnames";
import { useIncludeServiceStore } from "../../../stores/includeServiceStore";
import Form from "./form";
import { useEffect } from "react";
import { UseFormGetValues, UseFormRegister, UseFormSetFocus } from "react-hook-form";
import { FormValues } from "../../../pages/service";

type NewProps = {
    setFocus: UseFormSetFocus<FormValues>;
    setPort: React.Dispatch<React.SetStateAction<SerialPort | undefined>>;
    register: UseFormRegister<FormValues>;
    getValues: UseFormGetValues<FormValues>;
    port: SerialPort | undefined
}
const New = ({ setFocus, setPort, port, register, getValues }: NewProps) => {
    const isOpened = useIncludeServiceStore(state => state.isNewSellOpened);
    const setIsNewSellOpened = useIncludeServiceStore(state => state.setIsNewSellOpened);

    useEffect(() => {
        if (isOpened) {
            setFocus('cpf');
        }
    }, [isOpened]);



    const handleAdd = async () => {
        const pesarBalanca = getValues('pesarBalanca');
        if (!port && !isMobileDevice() && pesarBalanca) {
            const port = await navigator.serial.requestPort();
            setPort(port);
        }
        setIsNewSellOpened(false);
    }
    const isMobileDevice = () => {
        const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
        return mobileMediaQuery.matches;
    }

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
                                Nova Venda
                            </h3>
                            <button type="button" id="add-service" onClick={() => handleAdd()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Fechar modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <Form register={register} />
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="static-modal" type="button" onClick={() => handleAdd()} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Adicionar</button>
                            <label className="inline-flex items-center cursor-pointer">
                                <input {...register("pesarBalanca")} type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Incluir Balança</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {isOpened ? (
                <div
                    modal-backdrop=""
                    className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
                ></div>
            ) : (
                <></>
            )}
        </>
    );
}

export default New;