import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { Cliente } from "@/type/clientes";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import DeleteClientButton from "./DeleteClientButton";
import EditClientButton from "./EditClientButton";


interface ClientesTableProps {
  clientes: Cliente[];
  onAddClient: () => void;
  onEditClient: (cliente: Cliente) => void;
  onDeleteClient: (cliente: number) => Promise<void>;
  isLoading: boolean;
  isFetchingData: boolean;
  isError: boolean;
}

export default function ClientesTable(props: ClientesTableProps) {
  if(props.isError) {
    return (
      <div className="bg-red-50 border border-red-500 rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">Erro critico ao carregar clientes. Entre em contato com o suporte.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Clientes
          </h1>
          {props.isFetchingData && (
            <div className="w-6 h-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          )}
        </div>
        <Button 
          color="primary" 
          variant="solid" 
          size="md" 
          startContent={<Plus className="w-4 h-4" />}
          onPress={props.onAddClient}
        >
          Novo Cliente
        </Button>
      </div>

      {props.isLoading ? (
        <div className="mt-4"><DotLottieReact
          src="/coffee.lottie"
          loop
          autoplay
        /></div>
      ) : (
        <div className="overflow-x-auto">
        <Table 
          isStriped 
          removeWrapper 
          aria-label="Tabela de clientes"
          classNames={{
            wrapper: "min-h-[222px]",
            table: "min-w-[1200px]"
          }}
        >
          <TableHeader>
            <TableColumn allowsSorting className="w-48">NOME</TableColumn>
            <TableColumn allowsSorting className="w-64">E-MAIL</TableColumn>
            <TableColumn className="w-96">FUNÇÃO</TableColumn>
            <TableColumn className="w-40">CPF/CNPJ</TableColumn>
            <TableColumn className="w-32">CIDADE</TableColumn>
            <TableColumn className="w-24">ESTADO</TableColumn>
            <TableColumn className="w-32">PAÍS</TableColumn>
            <TableColumn className="text-center w-24">AÇÕES</TableColumn>
          </TableHeader>
          <TableBody items={props.clientes} emptyContent="Nenhum cliente encontrado">
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.name}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.email}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.role}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.cpfCnpj}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.city}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.state}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"}`}>
                  {item.country}
                </TableCell>
                <TableCell className={`${item.id % 2 === 0 ? "!bg-white" : "!bg-gray-50"} flex gap-2 justify-center`}>
                  <EditClientButton 
                    item={item}
                    onEditClient={props.onEditClient}
                  />
                  <DeleteClientButton 
                    itemId={item.id}
                    onDeleteClient={props.onDeleteClient}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      )}
    </div>
  );
}
