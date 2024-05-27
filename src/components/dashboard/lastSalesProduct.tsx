
const LastSalesProduct = () => {

    return (
        <div className="relative w-1/2 mr-6 overflow-auto shadow-md sm:rounded-lg h-full h-64">
            <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-stone-500">
                Vendidos Recentes
            </h5>
            <br />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-[#1a3a31] dark:bg-[#00593e] dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-3">
                            Produto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valor Compra
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valor Venda
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Peso
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qtd
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-[#1a3a31] even:bg-gray-50 even:bg-[#1a3a30e6] border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Banana
                        </th>
                        <td className="px-6 py-4">
                            R$ 10,00
                        </td>
                        <td className="px-6 py-4">
                            R$ 11,00
                        </td>
                        <td className="px-6 py-4">
                            369
                        </td>
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4">
                            R$ 11,00
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-[#1a3a31] even:bg-gray-50 even:bg-[#1a3a30e6] border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Banana
                        </th>
                        <td className="px-6 py-4">
                            R$ 10,00
                        </td>
                        <td className="px-6 py-4">
                            R$ 11,00
                        </td>
                        <td className="px-6 py-4">
                            369
                        </td>
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4">
                            R$ 11,00
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-[#1a3a31] even:bg-gray-50 even:bg-[#1a3a30e6] border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Banana
                        </th>
                        <td className="px-6 py-4">
                            R$ 10,00
                        </td>
                        <td className="px-6 py-4">
                            R$ 11,00
                        </td>
                        <td className="px-6 py-4">
                            369
                        </td>
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4">
                            R$ 11,00
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>);
}

export default LastSalesProduct;