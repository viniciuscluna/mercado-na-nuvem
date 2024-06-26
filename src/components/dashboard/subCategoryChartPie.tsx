import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CustomLabelPieProps } from "./chartProps";
import { getProductBrand } from "../../services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import LoadingIndicator from "../loadingIndicator";


const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelPieProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const SubCategoryChartPie = () => {
  const COLORS = ["#0a6cc2", "#17bf9f", "#dba021", "#c76332", "#30b837", "#db3939"];

  const { isPending, data: responseData } = useQuery({
    queryKey: ["dash/subCategory"],
    queryFn: getProductBrand,
  });

  const data = useMemo(
    () =>
      responseData ?
      responseData.map((item) => ({
        name: item.key,
        value: Number(item.count),
      })) : [],
    [responseData]
  );

  if (isPending) return <LoadingIndicator />;
 
  return (
    <div className="p-2 w-full">
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-stone-500">
        Marcas Agrupadas
      </h5>
      <br/>
      <div
        className="p-6 bg-white border border-gray-200 rounded-lg shadowhover:bg-[#1a3a30e6] dark:bg-[#00593E] dark:border-gray-700 dark:hover:bg-[#1a3a30e6]"
        style={{ width: "100%", height: "30dvh" }}
      >
        <ResponsiveContainer>
          <PieChart title="teste">
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabel}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubCategoryChartPie;
