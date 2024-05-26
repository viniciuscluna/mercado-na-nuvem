import { useQuery } from "@tanstack/react-query";
import {
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { getMonthlyProfit } from "../../services/dashboardService";
import { useMemo } from "react";
import LoadingIndicator from "../loadingIndicator";
import { currencyFormat } from "../../utils/currencyFormater";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-green-300 p-3 shadow rounded-md dark:text-white" >
        <p className="label">Data: {`${label}`}</p>
        <p className="label">Valor: {` ${currencyFormat(payload[0].value)}`}</p>
        <p className="desc">Valores faturados no dia.</p>
      </div>
    );
  }

  return null;
};

const MonthProfitChartBar = () => {

  const { isPending, data: responseData } = useQuery({
    queryKey: ["dash/monthProfit"],
    queryFn: getMonthlyProfit,
  });

  const data = useMemo(
    () =>
      responseData ?
        responseData.map((item) => ({
          name: item.key,
          Faturamento: Number(item.count),
        })) : [],
    [responseData]
  );

  if (isPending) return <LoadingIndicator />;




  return (
    <div className="p-2 flex mt-10">
      <div className="relative w-1/2 mr-6 overflow-auto shadow-md sm:rounded-lg h-full h-64">
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-stone-500">
              Vendidos Recentes
            </h5>
            <br />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-[#1a3a31] dark:bg-[#00593e] dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-3">
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
                        <tr className="odd:bg-white odd:dark:bg-[#1a3a31] even:bg-gray-50 even:bg-[#1a3a30e6] border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                
                            </th>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                               
                            </td>
                            <td className="px-6 py-4">
                                
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 justify-between">
        

                                    <button type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" title="Remover">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg></button>
                                </div>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
     
        <div className="w-1/2">
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-stone-500">
        Faturamento Mensal
      </h5>
      <br />
      <div
        className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-[#1a3a30e6] dark:bg-[#1a3a31] dark:border-gray-700 dark:hover:bg-[#1a3a30e6]"
        style={{ width: "100%", height: "40dvh" }}
      >
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(number: number) => currencyFormat(number)} content={<CustomTooltip />} />
            <Legend />
            <Bar
              type="monotone"
              dataKey="Faturamento"
              fill="#ffffff"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MonthProfitChartBar;
