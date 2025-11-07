# useState - React Hook

## O que é useState?

O `useState` é um **Hook do React** que permite adicionar estado a componentes funcionais. Ele retorna um array com dois elementos:

1. **Valor atual do estado** - a variável que armazena o estado
2. **Função para atualizar o estado** - função que permite modificar o valor do estado

### Sintaxe

```jsx
const [estado, setEstado] = useState(valorInicial);
```

### Características principais

- **Preservação de estado**: O valor do estado persiste entre re-renderizações do componente
- **Re-renderização**: Quando o estado é atualizado, o React re-renderiza o componente automaticamente
- **Valor inicial**: Pode ser qualquer tipo de dado (string, número, objeto, array, boolean, etc.)
- **Imutabilidade**: O estado não deve ser modificado diretamente, sempre use a função setter

### Exemplo básico

```jsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Você clicou {contador} vezes</p>
      <button onClick={() => setContador(contador + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

## Fluxograma do funcionamento do useState

```mermaid
flowchart TD
    A[Início: Componente é renderizado] --> B{useState foi<br/>inicializado?}
    B -->|Não| C[Inicializa estado com<br/>valor inicial]
    B -->|Sim| D[Usa valor atual<br/>do estado]
    C --> E[Renderiza componente<br/>com estado inicial]
    D --> F[Renderiza componente<br/>com estado atual]
    E --> G{Usuário interage?<br/>ex: clique em botão}
    F --> G
    G -->|Não| H[Aguarda interação]
    H --> G
    G -->|Sim| I[Função setter é chamada<br/>ex: setContador]
    I --> J[React atualiza o<br/>valor do estado]
    J --> K[React agenda<br/>re-renderização]
    K --> L[Componente é<br/>re-renderizado]
    L --> B
    
    style A fill:#e1f5ff
    style C fill:#fff4e1
    style J fill:#ffe1e1
    style K fill:#ffe1e1
    style L fill:#e1ffe1
```

## Ciclo de vida do useState

```mermaid
sequenceDiagram
    participant U as Usuário
    participant C as Componente
    participant R as React
    participant S as Estado (useState)

    Note over C,R: Primeira Renderização
    C->>R: Componente é montado
    R->>S: Inicializa useState(valorInicial)
    S-->>C: Retorna [valor, setter]
    C->>U: Exibe UI com valor inicial

    Note over U,S: Interação do Usuário
    U->>C: Evento (ex: clique)
    C->>S: Chama setter(novoValor)
    S->>R: Notifica mudança de estado
    R->>R: Agenda re-renderização
    
    Note over C,R: Re-renderização
    R->>C: Re-renderiza componente
    C->>S: Acessa useState novamente
    S-->>C: Retorna [novoValor, setter]
    C->>U: Exibe UI atualizada
```

## Boas práticas

1. **Nunca modifique o estado diretamente**
   ```jsx
   // ❌ Errado
   estado.push(novoItem);
   
   // ✅ Correto
   setEstado([...estado, novoItem]);
   ```

2. **Use múltiplos useState para estados independentes**
   ```jsx
   const [nome, setNome] = useState('');
   const [idade, setIdade] = useState(0);
   ```

3. **Use função callback para atualizações baseadas no estado anterior**
   ```jsx
   // ✅ Correto para atualizações baseadas no estado anterior
   setContador(prev => prev + 1);
   ```

4. **Agrupe estados relacionados em objetos**
   ```jsx
   const [usuario, setUsuario] = useState({
     nome: '',
     email: '',
     idade: 0
   });
   ```

