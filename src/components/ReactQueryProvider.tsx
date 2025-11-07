import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider(props: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo de cache padrão: 5 minutos
            // staleTime: 5 * 60 * 1000,
            // Tempo de garbage collection: 10 minutos
            // gcTime: 10 * 60 * 1000,
            // Tentar novamente em caso de erro
            retry: 1,
            // Refetch quando a janela recebe foco
            refetchOnWindowFocus: true,
            // Refetch ao reconectar
            refetchOnReconnect: true,
          },
          mutations: {
            // Tentar novamente em caso de erro nas mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
}

