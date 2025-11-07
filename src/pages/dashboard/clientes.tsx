import { clientesService } from "@/services/clientes.service";
import { Cliente } from "@/type/clientes";
import { useEffect } from "react";
import ClientesTable from "@/components/clientes/ClientesTable";
import ClienteAddOrEditForm from "@/components/clientes/ClienteAddOrEditForm";
import { useDisclosure } from "@heroui/react";
import { useMainStore } from "@/stores/main.store";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClienteFormData } from "@/schemas/cliente.schema";
import { useHandleErrors } from "@/hooks/useHandleErrors";


export default function ClientesPage() {
  
  const queryClient = useQueryClient();
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { tempCliente, setTempCliente } = useMainStore();

  const { data: clientesQuery, isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError: isErrorQuery, error: errorQuery } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => clientesService.getAll(),
    staleTime: 1 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false
  });

  // CUSTOM HOOK PARA TRATAR ERROS
  // ATENÇÃO ALUNOS: useHandleErrors é um hook que trata erros de requisições
  // Ele é usado para tratar erros de requisições e exibir mensagens de erro para o usuário
  useHandleErrors({ errorQuery });

  const { mutate: deleteClientMutation } = useMutation({
    mutationKey: ['deleteCliente'],
    mutationFn: async (id: number) => await clientesService.delete(id),
    onSuccess: () => {
      toast.success('Cliente deletado com sucesso');
      queryClient.refetchQueries({ queryKey: ['clientes'] });
      // queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao deletar cliente');
    }
  });

  const { mutate: addClientMutation, isPending: isAddingClientMutation } = useMutation({
    mutationKey: ['addCliente'],
    mutationFn: async (cliente: ClienteFormData) => await clientesService.create(cliente),
    onSuccess: () => {
      toast.success('Cliente criado com sucesso');
      queryClient.refetchQueries({ queryKey: ['clientes'] });
      setTempCliente(null);
      onOpenChange(); // fecha o drawer
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar cliente');
    }
  });

  const { mutate: updateClientMutation } = useMutation({
    mutationKey: ['updateCliente'],
    mutationFn: async () => await clientesService.update(tempCliente!),
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso');
      queryClient.refetchQueries({ queryKey: ['clientes'] });
      setTempCliente(null);
    },
  });

  const handleUpdateClient = () => {
    updateClientMutation();
  };

  const handleAddClient = (cliente: ClienteFormData) => {
    addClientMutation(cliente);
  };

  const handleEditClient = (cliente: Cliente) => {
    setTempCliente(cliente);
  };

  const handleDeleteClient = async (cliente: number) => {
    deleteClientMutation(cliente);
  };

  useEffect(() => {
    if(tempCliente) {
      onOpenChange();
    }
  }, [tempCliente]);

  // ATENÇÃO ALUNOS: isErrorQuery é um booleano que indica se houve erro ao buscar clientes
  // useEffect(() => {
  //   if(isErrorQuery) {
  //     toast.error('Erro ao buscar clientes');
  //   }
  // }, [isErrorQuery]);



  return (
    <>
     
      <ClientesTable 
        isError={isErrorQuery}
        isFetchingData={isFetchingQuery}
        isLoading={isLoadingQuery}
        clientes={clientesQuery ?? []}
        onAddClient={() => onOpen()}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
      />
      <ClienteAddOrEditForm 
          isOpen={isOpen}
          onAddClient={handleAddClient}
          onUpdateClient={handleUpdateClient}
          onOpenChange={onOpenChange}
          isPending={isAddingClientMutation}
      />
    </>
  );
}
