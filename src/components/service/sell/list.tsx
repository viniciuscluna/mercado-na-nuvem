import { UseFieldArrayRemove } from "react-hook-form";
import { Product } from "../../../pages/service";
import { currencyFormat } from "../../../utils/currencyFormater";

type ListProps = {
    products: Product[];
    remove: UseFieldArrayRemove;
}

const List = ({ products, remove }: ListProps) => {
    return (

        <div className="relative overflow-auto bg-[#B6B6B6] dark:bg-[#060F0E] dark:bg-opacity-85 shadow-md sm:rounded-lg w-full h-full h-64">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-[#1a3a31] dark:bg-[#011611] dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Código
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantidade
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Peso
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Unitário
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, idx) =>
                        <tr className="dark:bg-[#060F0E] odd:bg-white odd:dark:bg-[#1a3a31] even:bg-gray-50 even:bg-[#1a3a30e6] dark:bg-[#060F0E] border-b dark:border-gray-700" key={idx}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.codigo}
                            </th>
                            <td className="px-6 py-4">
                                {product.nome}
                            </td>
                            <td className="px-6 py-4">
                                {product.quantidade}
                            </td>
                            <td className="px-6 py-4">
                                {product.peso}
                            </td>
                            <td className="px-6 py-4">
                                {currencyFormat(product.unitario)}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 justify-between">
                                    {currencyFormat(product.total)}

                                    <button type="button" onClick={() => remove(idx)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" title="Remover">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg></button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default List;