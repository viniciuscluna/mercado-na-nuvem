import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useServiceStore } from "../../stores/servicosStore";
import { EPrestacaoServicoStatus } from "../../domain/ePrestacaoServicoStatus";
import { getAllInDone } from "../../services/ordemVendaService";
import Loader from "../../components/loader";
import SubTitle from "../../components/subTitle";
import Filter from "../../components/reports/filter";
import Card from "../../components/reports/card";
import { EOrdemVendaStatus } from "../../domain/eOrdemVendaStatus";

const Reports = () => {
  const [refFilter, setRefFilter] = useState<string>("");
  const setOrdemVenda = useServiceStore((state) => state.setOrdemVenda);

  const { data: prestacaoData, isPending, refetch, isSuccess } = useQuery({
    queryKey: ["vendaServico"],
    queryFn: () => getAllInDone(),
  });

  useEffect(() => {
    if (isSuccess) setOrdemVenda(prestacaoData);
  }, [isSuccess, setOrdemVenda, prestacaoData])

  const concluidas = useMemo(
    () =>
      prestacaoData?.filter(
        (f) =>
          [
            EOrdemVendaStatus.concluido,
            EPrestacaoServicoStatus.rejeitado,
          ].includes(f.status) && f.referencia.includes(refFilter)
      ),
    [prestacaoData, refFilter]
  );

  if (isPending) return <Loader />;
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-extrabold dark:text-white mt-6 mb-4">
        Vendas Finalizadas
      </h2>
      <SubTitle>
        <Filter inputCallback={setRefFilter} updateCallback={() => refetch()} />
      </SubTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {concluidas?.map((ordemVenda, index) => (
          <Card key={index} ordemVenda={ordemVenda} />
        ))}
      </div>
    </div>
  );
};

export default Reports;
