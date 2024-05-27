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
    <div className="relative w-1/2 mr-6 overflow-auto shadow-md sm:rounded-lg h-full h-64">
      <div className="w-full">
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
