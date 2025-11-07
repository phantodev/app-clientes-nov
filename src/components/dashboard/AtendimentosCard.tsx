import InfoCard from "./InfoCard";
import { Users } from "lucide-react";

export default function AtendimentosCard() {
  return (
    <InfoCard
      title="Total de Atendimentos"
      value={127}
      icon={<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      trend={{ value: 12, isPositive: true }}
      description="Este mês"
    />
  );
}

