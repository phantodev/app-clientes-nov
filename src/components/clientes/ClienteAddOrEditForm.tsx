import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/drawer";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema, ClienteFormData } from "../../schemas/cliente.schema";
import { useMainStore } from "@/stores/main.store";
import { useEffect } from "react";
import { Cliente } from "@/type/clientes";

interface ClienteAddSidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddClient: (cliente: ClienteFormData) => void;
  onUpdateClient: () => void;
  isPending: boolean;
}

export default function ClienteAddOrEditForm({ isOpen, onOpenChange, onAddClient, isPending, onUpdateClient }: ClienteAddSidebarProps) {

  const { tempCliente, setTempCliente } = useMainStore();



  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    // defaultValues: {
    //   name: tempCliente?.name ?? '',
    //   email: tempCliente?.email ?? '',
    //   password: tempCliente?.password ?? '',
    //   cpfCnpj: tempCliente?.cpfCnpj ?? '',
    //   role: tempCliente?.role ?? 'customer',
    //   city: tempCliente?.city ?? '',
    //   state: tempCliente?.state ?? '',
    //   country: 'Brasil'
    // }
  });

  useEffect(() => {
    if(tempCliente) {
      reset(tempCliente);
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        cpfCnpj: '',
        role: 'customer',
        city: '',
        state: '',
        country: 'Brasil'
      } as ClienteFormData);
    }
  }, [tempCliente]);

  const onSubmit = async (data: ClienteFormData) => {
    try {
      if(tempCliente) {
        const clienteUpdated: Cliente = {
          id: tempCliente.id,
          name: data.name,
          email: data.email,
          password: data.password,
          cpfCnpj: data.cpfCnpj,
          role: data.role,
          city: data.city,
          state: data.state,
          country: data.country,
          avatar: tempCliente.avatar,
          creationAt: tempCliente.creationAt,
          updatedAt: tempCliente.updatedAt
        };
        setTempCliente(clienteUpdated);
        onUpdateClient();
      } else {
        onAddClient(data);
      }
      reset();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };
  
  return (
    <Drawer size="2xl" isOpen={isOpen} onOpenChange={handleCancel}>
      <DrawerContent>
        <DrawerHeader>
          <h2 className="text-xl font-semibold">{tempCliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        </DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="space-y-6">
            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Informações Pessoais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Nome Completo"
                      defaultValue={tempCliente?.name ?? ''}
                      placeholder="Digite o nome completo"
                      isRequired
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      type="email"
                      label="E-mail"
                      defaultValue={tempCliente?.email ?? ''}
                      placeholder="Digite o e-mail"
                      isRequired
                      isInvalid={!!error}
                      errorMessage={error?.message}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      label="Senha"
                      defaultValue={tempCliente?.password || ''}
                      placeholder="Digite a senha"
                      isRequired
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />
                
                <Controller
                  name="cpfCnpj"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="CPF/CNPJ"
                      defaultValue={tempCliente?.cpfCnpj || ''}
                      placeholder="000.000.000-00"
                      isRequired
                      isInvalid={!!errors.cpfCnpj}
                      errorMessage={errors.cpfCnpj?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Informações de Acesso */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Informações de Acesso</h3>
              
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    aria-label="Tipo de Usuário"
                    aria-labelledby="Tipo de Usuário"
                    aria-describedby="Tipo de Usuário"
                    aria-required="true"
                    aria-invalid={!!errors.role}
                    label="Tipo de Usuário"
                    placeholder="Selecione o tipo de usuário"
                    isRequired
                    isInvalid={!!errors.role}
                    errorMessage={errors.role?.message}
                    selectedKeys={
                      field.value 
                        ? [field.value] 
                        : tempCliente?.role 
                          ? [tempCliente.role] 
                          : []
                    }
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      field.onChange(selectedKey);
                    }}
                  >
                    <SelectItem key="admin">
                      Administrador
                    </SelectItem>
                    <SelectItem key="customer">
                      Cliente
                    </SelectItem>
                  </Select>
                )}
              />
            </div>

            {/* Informações de Localização */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Informações de Localização</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Cidade"
                      defaultValue={tempCliente?.city || ''}
                      placeholder="Digite a cidade"
                      isRequired
                      isInvalid={!!errors.city}
                      errorMessage={errors.city?.message}
                    />
                  )}
                />
                
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Estado"
                      aria-label="Estado"
                      aria-labelledby="Estado"
                      aria-describedby="Estado"
                      aria-required="true"
                      aria-invalid={!!errors.state}
                      placeholder="Selecione o estado"
                      isRequired
                      isInvalid={!!errors.state}
                      errorMessage={errors.state?.message}
                      selectedKeys={
                        field.value 
                          ? [field.value] 
                          : tempCliente?.state 
                            ? [tempCliente.state] 
                            : []
                      }
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        field.onChange(selectedKey);
                      }}
                    >
                      <SelectItem key="AC">Acre</SelectItem>
                      <SelectItem key="AL">Alagoas</SelectItem>
                      <SelectItem key="AP">Amapá</SelectItem>
                      <SelectItem key="AM">Amazonas</SelectItem>
                      <SelectItem key="BA">Bahia</SelectItem>
                      <SelectItem key="CE">Ceará</SelectItem>
                      <SelectItem key="DF">Distrito Federal</SelectItem>
                      <SelectItem key="ES">Espírito Santo</SelectItem>
                      <SelectItem key="GO">Goiás</SelectItem>
                      <SelectItem key="MA">Maranhão</SelectItem>
                      <SelectItem key="MT">Mato Grosso</SelectItem>
                      <SelectItem key="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem key="MG">Minas Gerais</SelectItem>
                      <SelectItem key="PA">Pará</SelectItem>
                      <SelectItem key="PB">Paraíba</SelectItem>
                      <SelectItem key="PR">Paraná</SelectItem>
                      <SelectItem key="PE">Pernambuco</SelectItem>
                      <SelectItem key="PI">Piauí</SelectItem>
                      <SelectItem key="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem key="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem key="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem key="RO">Rondônia</SelectItem>
                      <SelectItem key="RR">Roraima</SelectItem>
                      <SelectItem key="SC">Santa Catarina</SelectItem>
                      <SelectItem key="SP">São Paulo</SelectItem>
                      <SelectItem key="SE">Sergipe</SelectItem>
                      <SelectItem key="TO">Tocantins</SelectItem>
                    </Select>
                  )}
                />
                
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="País"
                      placeholder="Digite o país"
                      isRequired
                      isInvalid={!!errors.country}
                      errorMessage={errors.country?.message}
                    />
                  )}
                />
              </div>
              <div className="flex justify-end gap-2 w-full items-center mt-10">
                <Button
                type="button"
                color="default"
                variant="light"
                onPress={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="primary"
                className="w-40"
                isLoading={isPending}
                isDisabled={isPending}
              >
                {isPending ? '' : tempCliente ? 'Editar Cliente' : 'Cadastrar Cliente'}
              </Button>
              </div>
            </div>
          </div>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}