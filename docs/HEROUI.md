# HeroUI com Vite

Este documento explica como configurar e iniciar um projeto utilizando Vite + HeroUI.

## Requisitos

Antes de começar, certifique-se de ter:

- Vite 2 ou superior
- React 18 ou superior
- Tailwind CSS v4
- Framer Motion 11.9 ou superior

---

## Métodos de Instalação

### 1. HeroUI CLI (Recomendado)

Se você está iniciando um novo projeto, a forma mais simples é usar o HeroUI CLI:

```bash
# Com pnpm
pnpm create heroui-app@latest

# Com npm
npx create-heroui-app@latest

# Com yarn
yarn create heroui-app

# Com bun
bunx create-heroui-app@latest
```

### 2. Usando Template HeroUI + Vite

Você também pode criar um projeto Vite pré-configurado com HeroUI:

```bash
# Com pnpm
pnpm create vite my-app --template react-ts

# Com npm
npm create vite@latest my-app -- --template react-ts

# Com yarn
yarn create vite my-app --template react-ts

# Com bun
bun create vite my-app --template react-ts
```

---

## Instalação Manual

### Passo 1: Adicionar Dependências

No seu projeto Vite React, execute um dos seguintes comandos:

```bash
# Com pnpm
pnpm add @heroui/react framer-motion

# Com npm
npm install @heroui/react framer-motion

# Com yarn
yarn add @heroui/react framer-motion

# Com bun
bun add @heroui/react framer-motion
```

### Passo 2: Configuração de Dependências Hoisted (apenas pnpm)

> **Nota**: Este passo é apenas para quem usa `pnpm`. Se você usa outro gerenciador de pacotes, pode pular esta etapa.

Adicione a seguinte linha ao arquivo `.npmrc`:

```
public-hoist-pattern[]=*@heroui/*
```

Após modificar o arquivo `.npmrc`, execute `pnpm install` novamente.

### Passo 3: Configuração do Tailwind CSS

HeroUI é construído sobre o Tailwind CSS, então você precisa instalá-lo primeiro. Siga o [guia oficial de instalação do Tailwind CSS](https://tailwindcss.com/docs/installation).

> **Nota**: Se você está usando pnpm e arquitetura monorepo, certifique-se de apontar para o `node_modules` RAIZ.

### Passo 4: Criar arquivo de configuração

Crie um arquivo `hero.ts` na raiz do projeto e adicione:

```typescript
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
```

### Passo 5: Adicionar estilos CSS

Adicione o seguinte código ao seu arquivo CSS principal:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Passo 6: Configurar o Provider

Configure o `HeroUIProvider` na raiz da sua aplicação.

Vá até o diretório `src` e dentro de `main.jsx` ou `main.tsx`, envolva o `HeroUIProvider` ao redor do App:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>
);
```

---

## Instalação Automática de Componentes

Você pode adicionar componentes individuais usando o CLI:

```bash
# Adicionar um componente específico
heroui add button

# Adicionar múltiplos componentes
heroui add button input card

# Adicionar a biblioteca principal
heroui add @heroui/react
```

Se você não especificar o nome do componente, o CLI irá solicitar que você selecione os componentes que deseja adicionar.

> **Nota**: Você ainda precisa adicionar o provider à sua aplicação manualmente.

---

## Referências

- [Documentação Oficial do HeroUI](https://www.heroui.com/docs/frameworks/vite)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/)

---

**Pronto!** Agora você está pronto para começar a desenvolver com HeroUI e Vite. 🚀

