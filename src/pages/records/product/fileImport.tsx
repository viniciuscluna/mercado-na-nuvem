import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { uploadProduct } from "../../../services/produtoService";
import { useNotificationStore } from "../../../stores/notificationStore";

type FileFields = {
    file: FileList
}

type FileImportProps = {
    onUploadCallback: () => void;
}

const FileImport = ({ onUploadCallback }: FileImportProps) => {
    const { register, handleSubmit } = useForm<FileFields>({ mode: "all" });
    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );
    const { mutateAsync } = useMutation({
        mutationFn: uploadProduct,
        onSuccess: () => {
            addNotification({
                type: 'success',
                message: 'Upload Realizado'
            });
            onUploadCallback();
        },
        onError: () => {
            addNotification({
                type: 'error',
                message: 'Erro ao realizar upload'
            });
        }
    })

    const onSubmit = (data: FileFields) => {
        mutateAsync(data.file);
    }

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file">Envio em lote</label>
            <div className="flex gap-2">
                <input {...register("file")}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-[#1a3a31] dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                ></input>
                <button type="button" onClick={handleSubmit(onSubmit)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Importar</button>
            </div>
        </div>
    )
}

export default FileImport;