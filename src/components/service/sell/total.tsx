import { currencyFormat } from "../../../utils/currencyFormater";

type TotalProps = {
    total: number;
}
const Total = ({total}: TotalProps) => {
    return (
        <div className="w-full p-4 text-center bg-[#908782] border rounded-lg shadow sm:p-8 dark:w-full p-4 text-center bg-[#908782] border rounded-lg shadow sm:p-8 bg-[#B6B6B6]">
            <h5 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Total da Compra</h5>
            <h6 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">{currencyFormat(total)}</h6>
        </div>
    )
}

export default Total;