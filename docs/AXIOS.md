# AXIOS - Resumo para Aplicações React

## O que é Axios?

Axios é uma biblioteca JavaScript baseada em Promises para fazer requisições HTTP tanto no navegador quanto no Node.js. É uma das ferramentas mais populares para comunicação com APIs em aplicações React.

## Para que serve o Axios?

### 1. **Comunicação com APIs REST**
- Facilita a comunicação entre o frontend (React) e o backend (API)
- Permite fazer requisições GET, POST, PUT, DELETE, PATCH, etc.

### 2. **Principais Vantagens**
- ✅ **Sintaxe simples e intuitiva**
- ✅ **Suporte nativo a Promises e async/await**
- ✅ **Transformação automática de JSON**
- ✅ **Interceptors para requisições e respostas**
- ✅ **Tratamento de erros simplificado**
- ✅ **Cancelamento de requisições**
- ✅ **Proteção contra XSRF**
- ✅ **Timeout configurável**

### 3. **Casos de Uso Comuns**
- Buscar dados de uma API (GET)
- Enviar formulários (POST)
- Atualizar informações (PUT/PATCH)
- Deletar registros (DELETE)
- Upload de arquivos
- Autenticação com tokens

## Instalação

```bash
npm install axios
# ou
yarn add axios
```

## Exemplo Básico

```javascript
import axios from 'axios';

// GET - Buscar dados
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.exemplo.com/users');
    console.log(response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
};

// POST - Enviar dados
const createUser = async (userData) => {
  try {
    const response = await axios.post('https://api.exemplo.com/users', userData);
    console.log(response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

## Configuração Global (Instância)

```javascript
const api = axios.create({
  baseURL: 'https://api.exemplo.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
```

## Fluxograma do Fluxo de Requisições com Axios

```mermaid
flowchart TD
    A[Componente React] -->|1. Inicia ação do usuário| B[Função com Axios]
    B -->|2. Configura requisição| C{Tipo de Requisição?}
    
    C -->|GET| D[axios.get]
    C -->|POST| E[axios.post]
    C -->|PUT| F[axios.put]
    C -->|DELETE| G[axios.delete]
    
    D --> H[Interceptor de Requisição]
    E --> H
    F --> H
    G --> H
    
    H -->|3. Adiciona headers/tokens| I[Envia para API]
    
    I -->|4. Aguarda resposta| J{Resposta da API}
    
    J -->|Sucesso 2xx| K[Interceptor de Resposta Success]
    J -->|Erro 4xx/5xx| L[Interceptor de Resposta Error]
    J -->|Timeout/Network Error| L
    
    K -->|5. Transforma JSON| M[response.data]
    L -->|5. Captura erro| N[error.response]
    
    M -->|6. Atualiza Estado| O[useState/setData]
    N -->|6. Trata erro| P[Exibe mensagem de erro]
    
    O --> Q[Re-renderiza Componente]
    P --> Q
    
    Q --> R[UI Atualizada]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style I fill:#ffe1e1
    style K fill:#e1ffe1
    style L fill:#ffe1e1
    style R fill:#e1f5ff
```

## Fluxo Detalhado com Interceptors

```mermaid
sequenceDiagram
    participant C as Componente React
    participant A as Axios Instance
    participant RI as Request Interceptor
    participant API as API Backend
    participant RSI as Response Interceptor
    participant S as State Management

    C->>A: Chama axios.get('/users')
    A->>RI: Intercepta requisição
    RI->>RI: Adiciona token de autenticação
    RI->>RI: Adiciona headers customizados
    RI->>API: Envia requisição HTTP
    
    alt Resposta com Sucesso
        API-->>RSI: Status 200-299
        RSI->>RSI: Valida resposta
        RSI->>RSI: Transforma dados
        RSI-->>A: Retorna response.data
        A-->>C: Promise resolvida
        C->>S: Atualiza estado (setState)
        S->>C: Re-renderiza com novos dados
    else Erro na Requisição
        API-->>RSI: Status 400-500
        RSI->>RSI: Captura erro
        RSI->>RSI: Trata erro específico
        RSI-->>A: Retorna Promise.reject()
        A-->>C: Cai no catch
        C->>C: Exibe mensagem de erro
        C->>S: Atualiza estado de erro
    end
```

## Ciclo Completo em uma Aplicação React

```mermaid
graph LR
    A[Usuário clica em botão] --> B[useEffect ou Handler]
    B --> C[setLoading true]
    C --> D[axios.request]
    D --> E{Sucesso?}
    E -->|Sim| F[setData]
    E -->|Não| G[setError]
    F --> H[setLoading false]
    G --> H
    H --> I[Componente renderiza]
    
    style A fill:#4CAF50,color:#fff
    style D fill:#2196F3,color:#fff
    style E fill:#FF9800,color:#fff
    style I fill:#4CAF50,color:#fff
```

## Boas Práticas

1. **Criar uma instância centralizada**
   - Evita repetição de código
   - Facilita manutenção

2. **Usar interceptors**
   - Para adicionar tokens automaticamente
   - Para tratamento global de erros

3. **Implementar tratamento de erros**
   - Sempre use try/catch ou .catch()
   - Forneça feedback ao usuário

4. **Usar estados de loading**
   - Melhora a experiência do usuário
   - Indica quando dados estão sendo carregados

5. **Cancelar requisições quando necessário**
   - Evita memory leaks
   - Use AbortController ou CancelToken

## Exemplo Completo com React

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.exemplo.com/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Resumo

Axios é essencial em aplicações React modernas para:
- **Simplificar** a comunicação com APIs
- **Padronizar** requisições HTTP
- **Melhorar** o tratamento de erros
- **Otimizar** o gerenciamento de estados de loading/error
- **Facilitar** a manutenção do código

Com Axios, você transforma requisições complexas em código limpo e fácil de entender! 🚀

