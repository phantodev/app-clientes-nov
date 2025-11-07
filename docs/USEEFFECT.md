# useEffect - Hook de Efeitos no React

## O que é o useEffect?

O `useEffect` é um Hook do React que permite executar **efeitos colaterais** em componentes funcionais. Efeitos colaterais são operações que afetam algo fora do escopo da função do componente, como:

- Fazer requisições para APIs
- Configurar timers
- Manipular o DOM diretamente
- Fazer subscrições ou limpeza de recursos

## Sintaxe Básica

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // Código do efeito aqui
}, [dependências]);
```

## Quando o useEffect é executado?

O `useEffect` é executado **após** o componente ser renderizado na tela. Ele pode ser executado:

1. **Sempre** (sem array de dependências)
2. **Uma vez** (array vazio `[]`)
3. **Quando as dependências mudam** (array com valores `[valor1, valor2]`)

## Exemplos Práticos

### 1. Executar sempre (sem dependências)
```javascript
useEffect(() => {
  console.log('Componente foi renderizado!');
});
```

### 2. Executar apenas uma vez (componentDidMount)
```javascript
useEffect(() => {
  console.log('Componente montou!');
}, []); // Array vazio
```

### 3. Executar quando dependência muda
```javascript
useEffect(() => {
  console.log('Nome mudou:', nome);
}, [nome]); // Executa quando 'nome' muda
```

### 4. Limpeza de recursos
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer executando...');
  }, 1000);

  // Função de limpeza
  return () => {
    clearInterval(timer);
  };
}, []);
```

## Fluxograma do useEffect

```mermaid
flowchart TD
    A[Componente é renderizado] --> B{useEffect tem dependências?}
    
    B -->|Não| C[Executa o efeito]
    B -->|Sim| D{Array de dependências está vazio?}
    
    D -->|Sim []| E[Executa apenas uma vez<br/>após a montagem]
    D -->|Não| F[Compara valores das dependências]
    
    F --> G{Dependências mudaram?}
    G -->|Sim| H[Executa o efeito]
    G -->|Não| I[Não executa o efeito]
    
    C --> J[Efeito executado]
    E --> J
    H --> J
    
    J --> K{useEffect retorna função de limpeza?}
    K -->|Sim| L[Armazena função de limpeza]
    K -->|Não| M[Fim]
    
    L --> N[Próxima renderização ou desmontagem]
    N --> O[Executa função de limpeza]
    O --> M
```

## Resumo

- **useEffect** = "Faça algo após renderizar"
- **Sem dependências** = Executa sempre
- **Array vazio []** = Executa uma vez
- **Com dependências** = Executa quando dependências mudam
- **Função de retorno** = Limpeza de recursos

## Dicas Importantes

1. **Sempre inclua dependências** que são usadas dentro do useEffect
2. **Use array vazio []** para efeitos que devem executar apenas uma vez
3. **Limpe recursos** (timers, subscrições) na função de retorno
4. **Evite loops infinitos** - não modifique dependências dentro do useEffect
