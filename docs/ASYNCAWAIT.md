# ASYNC/AWAIT - JavaScript

## O que é?

`async/await` é uma forma mais moderna e legível de trabalhar com código assíncrono no JavaScript. É uma sintaxe construída sobre **Promises**, mas que torna o código assíncrono parecer síncrono.

## Conceitos Principais

### 🔹 ASYNC
- Transforma uma função em uma função assíncrona
- Sempre retorna uma **Promise**
- Permite o uso de `await` dentro dela

```javascript
async function minhaFuncao() {
  return "Olá"; // Retorna Promise.resolve("Olá")
}
```

### 🔹 AWAIT
- Pausa a execução da função até a Promise ser resolvida
- Só pode ser usado dentro de funções `async`
- Retorna o valor resolvido da Promise

```javascript
async function buscarDados() {
  const resultado = await fetch('/api/dados');
  console.log(resultado); // Só executa após fetch() completar
}
```

## Fluxograma

```
┌─────────────────────────────────────────────────────────────┐
│                    INÍCIO DA FUNÇÃO                         │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  async function│
                    │   declarada?   │
                    └────────┬───────┘
                             │
                    ┌────────┴────────┐
                    │  SIM            │
                    ▼                 │
         ┌──────────────────┐         │
         │  Encontra AWAIT  │         │
         └────────┬─────────┘         │
                  │                   │
                  ▼                   │
      ┌───────────────────────┐       │
      │  Pausa execução       │       │
      │  Espera Promise       │       │
      │  resolver/rejeitar    │       │
      └───────────┬───────────┘       │
                  │                   │
         ┌────────┴────────┐          │
         │                 │          │
         ▼                 ▼          │
    ┌────────┐      ┌──────────┐     │
    │Resolveu│      │ Rejeitou │     │
    └────┬───┘      └─────┬────┘     │
         │                │          │
         ▼                ▼          │
  ┌──────────┐     ┌──────────┐     │
  │ Continua │     │  Lança   │     │
  │ próxima  │     │   erro   │     │
  │  linha   │     │ (catch)  │     │
  └─────┬────┘     └─────┬────┘     │
        │                │          │
        └────────┬───────┘          │
                 │                  │
                 ▼                  │
      ┌──────────────────┐          │
      │  Há mais AWAIT?  │          │
      └────────┬─────────┘          │
               │                    │
        ┌──────┴──────┐             │
        │             │             │
       SIM           NÃO            │
        │             │             │
        └─────┐       ▼             │
              │  ┌─────────┐        │
              │  │ Retorna │        │
              │  │ Promise │        │
              │  └────┬────┘        │
              │       │             │
              └───────┴─────────────┘
                      │
                      ▼
              ┌──────────────┐
              │     FIM      │
              └──────────────┘
```

## Exemplo Prático

### ❌ Sem ASYNC/AWAIT (usando Promises)
```javascript
function buscarUsuario() {
  fetch('https://api.example.com/user')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return fetch('https://api.example.com/posts');
    })
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
    })
    .catch(error => {
      console.error(error);
    });
}
```

### ✅ Com ASYNC/AWAIT
```javascript
async function buscarUsuario() {
  try {
    const responseUser = await fetch('https://api.example.com/user');
    const user = await responseUser.json();
    console.log(user);
    
    const responsePosts = await fetch('https://api.example.com/posts');
    const posts = await responsePosts.json();
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

## Tratamento de Erros

```javascript
async function exemploComErro() {
  try {
    const dados = await buscarDados();
    return dados;
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    throw erro; // Re-lança o erro se necessário
  } finally {
    console.log('Executa sempre, erro ou não');
  }
}
```

## Múltiplas Promises em Paralelo

### Sequencial (uma após a outra - LENTO)
```javascript
async function sequencial() {
  const resultado1 = await fetch('/api/1'); // Espera 1s
  const resultado2 = await fetch('/api/2'); // Espera 1s
  const resultado3 = await fetch('/api/3'); // Espera 1s
  // Total: ~3s
}
```

### Paralelo (todas ao mesmo tempo - RÁPIDO)
```javascript
async function paralelo() {
  const [resultado1, resultado2, resultado3] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2'),
    fetch('/api/3')
  ]);
  // Total: ~1s (tempo da mais lenta)
}
```

## Resumo Rápido

| Conceito | Descrição |
|----------|-----------|
| `async` | Declara função assíncrona que retorna Promise |
| `await` | Pausa execução até Promise resolver |
| `try/catch` | Captura erros em código assíncrono |
| `Promise.all()` | Executa múltiplas Promises em paralelo |

## Vantagens

✅ Código mais limpo e legível  
✅ Parece código síncrono  
✅ Facilita debug  
✅ Melhor tratamento de erros com try/catch  
✅ Evita "callback hell"

## Quando usar?

- Chamadas à APIs (fetch)
- Operações de banco de dados
- Leitura/escrita de arquivos
- Qualquer operação que retorne uma Promise

