import InfoCard from "./InfoCard";
import { Wrench } from "lucide-react";

export default function VeiculosManutencaoCard() {
  return (
    <InfoCard
      title="Veículos em Manutenção"
      value={23}
      icon={<Wrench className="w-6 h-6 text-orange-600 dark:text-orange-400" />}
      trend={{ value: 5, isPositive: false }}
      description="Em andamento"
    />
  );
}

