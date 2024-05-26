
const LastSalesProduct = () => {

    return (
        <div className="p-2 w-full">
            <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-stone-500">
                Ultimos Produtos Vendidos
            </h5>
            <br />
            <div
                className="p-6 bg-white border border-gray-200 rounded-lg shadow"
                style={{ width: "100%", height: "40dvh" }}
            >
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-[#1a3a31]s dark:bg-[#00593E] dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-lime-100">
                                    Produto
                                </th>
                                <th scope="col" className="px-6 py-3 text-lime-100">
                                    Valor Produto
                                </th>
                                <th scope="col" className="px-6 py-3 text-lime-100">
                                    Valor Venda
                                </th>
                                <th scope="col" className="px-6 py-3 text-lime-100">
                                    Peso
                                </th>
                                <th scope="col" className="px-6 py-3 text-lime-100">
                                    Icone
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:dark:bg-[#1a3a31] even:bg-zinc-500 even:bg-[#00593E] dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Teste</th>
                                <td className="px-6 py-4 font-medium dark:text-white">Teste</td>
                                <td className="px-6 py-4 font-medium dark:text-white">Teste</td>
                                <td className="px-6 py-4 font-medium dark:text-white">Teste</td>
                                <td className="px-6 py-4 font-medium dark:text-white">Teste</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}

export default LastSalesProduct;