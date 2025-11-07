import { Cliente } from "@/type/clientes";
import { Edit } from "lucide-react";

interface EditClientButtonProps {
  item: Cliente;
  onEditClient: (clienteId: Cliente) => void;
}

export default function EditClientButton({ item, onEditClient }: EditClientButtonProps) {
  const handleEdit = () => {
    console.log('Clicou em editar para item:', item);
    onEditClient(item);
  };

  return (
    <Edit 
      className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700" 
      onClick={handleEdit}
    />
  );
}

