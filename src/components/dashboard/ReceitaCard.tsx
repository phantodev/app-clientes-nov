import InfoCard from "./InfoCard";
import { DollarSign } from "lucide-react";

export default function ReceitaCard() {
  return (
    <InfoCard
      title="Receita Total"
      value="R$ 45.890,00"
      icon={<DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />}
      trend={{ value: 8, isPositive: true }}
      description="Últimos 30 dias"
    />
  );
}

