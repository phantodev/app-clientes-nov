import AtendimentosCard from "@/components/dashboard/AtendimentosCard";
import ReceitaCard from "@/components/dashboard/ReceitaCard";
import VeiculosManutencaoCard from "@/components/dashboard/VeiculosManutencaoCard";
import VendasLinhaChart from "@/components/dashboard/VendasLinhaChart";
import DistribuicaoServicosChart from "@/components/dashboard/DistribuicaoServicosChart";
import ComparativoMensalChart from "@/components/dashboard/ComparativoMensalChart";
// import { useQueries } from "@tanstack/react-query";

export default function DashboardPage() {

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['api1'],
  //       queryFn: () => fetch('/api/endpoint1').then(res => res.json()),
  //     },
  //     {
  //       queryKey: ['api2'],
  //       queryFn: () => fetch('/api/endpoint2').then(res => res.json()),
  //     },
  //     {
  //       queryKey: ['api3'],
  //       queryFn: () => fetch('/api/endpoint3').then(res => res.json()),
  //     },
  //   ],
  // });
  
  // // Acessar os resultados
  // const [api1, api2, api3] = results;


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Dashboard
            </h1>
                  {/* Cards de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AtendimentosCard />
            <ReceitaCard />
            <VeiculosManutencaoCard />
          </div>
                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VendasLinhaChart />
            <DistribuicaoServicosChart />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <ComparativoMensalChart />
          </div>
      </div>

    </div>
  );
}
