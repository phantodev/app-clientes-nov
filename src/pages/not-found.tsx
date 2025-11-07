import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
          {/* Ícone */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <SearchX
                size={120}
                className="text-blue-500 dark:text-blue-400"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="text-center space-y-4">
            <h1 className="text-8xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Página não encontrada
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Desculpe, a página que você está procurando não existe ou foi
              movida para outro endereço.
            </p>
          </div>

          {/* Botões */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              color="primary"
              size="lg"
              startContent={<Home size={20} />}
              onClick={() => navigate("/")}
              className="font-semibold"
            >
              Voltar para o Início
            </Button>
            <Button
              variant="bordered"
              size="lg"
              onClick={() => navigate(-1)}
              className="font-semibold"
            >
              Voltar à Página Anterior
            </Button>
          </div>

          {/* Informação adicional */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Se você acredita que isso é um erro, entre em contato com o
              suporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
