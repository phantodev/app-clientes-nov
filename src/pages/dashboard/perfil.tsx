import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@heroui/react";
import { Edit } from "lucide-react";
import { perfilSchema, PerfilFormData } from "@/schemas/perfil.schema";
import ModalAvatarCrop from "@/components/ModalAvatarCrop";
import { useMainStore } from "@/stores/main.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { toast } from "react-toastify";
import { User } from "@/type/users";

export default function PerfilPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { tempAvatar, user, setTempAvatar } = useMainStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmarSenha: "",
      avatar: null,
    },
  });

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (userData: User) => userService.updateUser(userData),
    onSuccess: () => {
      toast.success('Usuário atualizado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao atualizar usuário');
    }
  });

  const onSubmit = (data: PerfilFormData) => {
    if (!user) {
      toast.error('Usuário não encontrado');
      return;
    }

    const updateData: User = {
      ...user,
      name: data.name,
      email: data.email,
      avatar: tempAvatar || user.avatar,
    };

    // Inclui senha apenas se foi preenchida
    if (data.password && data.password.length > 0) {
      updateData.password = data.password;
    }

    updateUser(updateData);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        confirmarSenha: "",
        avatar: user?.avatar || null,
      });
      setTempAvatar(user?.avatar || null);
    }
  }, [user, reset, setTempAvatar]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Meu Perfil
      </h1>

      <div className="flex flex-col items-center mb-8">
        {/* Container com círculo de avatar */}
        <div className="relative inline-block">
          {/* Círculo de 200x200 */}
          <div className="w-[200px] h-[200px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {tempAvatar ? (
              <img
                src={tempAvatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-5xl text-gray-400 dark:text-gray-500">
                U
              </span>
            )}
          </div>
          
          {/* Input file escondido */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Selecionar imagem de perfil"
          />
          
          {/* Botão circular com ícone de edição na borda do círculo */}
          <Button
            isIconOnly
            className="absolute bottom-4 right-6 w-10 h-10 rounded-full shadow-lg translate-x-1/4 translate-y-1/4"
            color="primary"
            aria-label="Editar foto de perfil"
            onPress={handleEditClick}
          >
            <Edit size={18} />
          </Button>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Nome"
              placeholder="Digite seu nome"
              isRequired
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              placeholder="Digite seu email"
              isRequired
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              description="Deixe em branco se não quiser alterar a senha"
            />
          )}
        />

        <Controller
          name="confirmarSenha"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              isInvalid={!!errors.confirmarSenha}
              errorMessage={errors.confirmarSenha?.message}
            />
          )}
        />

        <div className="flex justify-end gap-2 mt-8">
          <Button
            type="submit"
            color="primary"
            className="w-40"
            isLoading={isPending}
          >
            Salvar Alterações
          </Button>
        </div>
      </form>

      <ModalAvatarCrop
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        image={selectedImage}
      />
    </div>
  );
}
