import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Alert } from "@heroui/alert";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password, rememberMe });
    // Aqui você pode adicionar a lógica de autenticação
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      console.log(response.data);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setEmailError(true);
      setPasswordError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo/Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bem-vindo
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo Email */}
            <Input
              type="email"
              label="Email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              isRequired
              variant="bordered"
              size="lg"
              errorMessage="Email inválido"
              isInvalid={emailError}
              classNames={{
                input: "text-base",
                inputWrapper: "border-gray-300 dark:border-gray-600",
              }}
            />

            {/* Campo Senha */}
            <Input
              type={showPassword ? "text" : "password"}
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              isRequired
              variant="bordered"
              size="lg"
              errorMessage="Senha inválida"
              isInvalid={passwordError}
              endContent={
                showPassword ? (
                  <Eye
                    className="cursor-pointer text-gray-400 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer text-gray-400 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
              classNames={{
                input: "text-base",
                inputWrapper: "border-gray-300 dark:border-gray-600",
              }}
            />

            {/* Lembrar-me */}
            <div className="flex items-center justify-between">
              <Checkbox
                isSelected={rememberMe}
                onValueChange={setRememberMe}
                size="sm"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Lembrar-me
                </span>
              </Checkbox>

              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Esqueceu a senha?
              </a>
            </div>

            {(emailError || passwordError) && (
              <Alert
                color="danger"
                title="Credenciais inválidas"
                className="mb-4"
              />
            )}

            {/* Botão Login */}
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-semibold"
              isLoading={loading}
              isDisabled={loading || !email || !password}
            >
              Login
            </Button>
          </form>

          {/* Link de Cadastro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
