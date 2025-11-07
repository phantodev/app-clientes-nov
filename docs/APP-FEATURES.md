# Documentação de Funcionalidades - Sistema ERP para Oficina

## 📋 Informações do Projeto

**Cliente:** Oficina Mecânica  
**Data:** 23 de Outubro de 2025  
**Departamento:** Comercial  
**Destino:** Product Manager / Time Front-End  
**Tecnologias:** Vite, React, TypeScript, HeroUI, Tailwind CSS, React Router DOM

---

## 🎯 Objetivo do Projeto

Desenvolver um sistema ERP web para gestão de oficina mecânica, contemplando três módulos principais: Cadastro de Clientes, Contas a Pagar e Meu Perfil.

---

## 📦 Módulos Solicitados

### 1. CADASTRO DE CLIENTES

#### 1.1 Descrição Geral
Módulo responsável por gerenciar todos os clientes da oficina, permitindo cadastro completo, edição, busca e visualização de informações dos clientes.

#### 1.2 Funcionalidades Obrigatórias

**1.2.1 Listagem de Clientes**
- Exibir tabela/cards com todos os clientes cadastrados
- Implementar paginação (sugestão: 10-20 registros por página)
- Campo de busca/filtro por:
  - Nome
  - CPF/CNPJ
  - Telefone
  - E-mail
- Ordenação por colunas (nome, data de cadastro, etc.)
- Botão de ação rápida: Editar, Visualizar, Excluir
- Indicador visual de status (ativo/inativo)

**1.2.2 Cadastro de Novo Cliente**
- Formulário com os seguintes campos:

**Dados Pessoais:**
- Nome Completo/Razão Social (obrigatório)
- CPF/CNPJ (obrigatório, com validação)
- RG/Inscrição Estadual
- Data de Nascimento/Fundação
- Tipo de Pessoa (Física/Jurídica)

**Contato:**
- Telefone Principal (obrigatório, com máscara)
- Telefone Secundário (opcional)
- E-mail (obrigatório, com validação)
- E-mail Secundário (opcional)

**Endereço:**
- CEP (com busca automática via API)
- Logradouro
- Número
- Complemento
- Bairro
- Cidade
- Estado
- País (padrão: Brasil)

**Informações do Veículo:**
- Placa (com máscara)
- Marca
- Modelo
- Ano
- Cor
- Observações
- Possibilidade de cadastrar múltiplos veículos por cliente

**Outras Informações:**
- Status (Ativo/Inativo)
- Observações gerais
- Data de cadastro (automática)
- Última atualização (automática)

**1.2.3 Edição de Cliente**
- Abrir formulário preenchido com dados existentes
- Permitir edição de todos os campos (exceto data de cadastro)
- Salvar alterações com confirmação
- Registrar histórico de modificações

**1.2.4 Visualização de Cliente**
- Exibir todos os dados do cliente em formato de visualização
- Mostrar histórico de serviços (integração futura)
- Mostrar histórico de pagamentos (integração futura)
- Opção de imprimir/exportar ficha do cliente

**1.2.5 Exclusão de Cliente**
- Modal de confirmação antes de excluir
- Opção de exclusão lógica (inativar) ao invés de física
- Validar se cliente possui vínculos ativos antes de excluir

#### 1.3 Validações Necessárias
- CPF/CNPJ válido
- E-mail em formato válido
- Telefone com DDD válido
- CEP válido
- Campos obrigatórios preenchidos
- Não permitir duplicidade de CPF/CNPJ

#### 1.4 Componentes HeroUI Sugeridos
- `Input` - campos de texto
- `Button` - ações
- `Table` - listagem
- `Modal` - confirmações e formulários
- `Dropdown` - seleções
- `Switch` - status ativo/inativo
- `Card` - exibição de informações

---

### 2. CONTAS A PAGAR

#### 2.1 Descrição Geral
Módulo financeiro para controle de todas as despesas e contas a pagar da oficina, incluindo fornecedores, colaboradores e despesas gerais.

#### 2.2 Funcionalidades Obrigatórias

**2.2.1 Dashboard Financeiro**
- Resumo visual com cards:
  - Total de contas a pagar (mês atual)
  - Contas vencidas
  - Contas a vencer (próximos 7 dias)
  - Total pago (mês atual)
- Gráfico de evolução mensal de despesas
- Filtros por período (mês, trimestre, ano)

**2.2.2 Listagem de Contas**
- Tabela com todas as contas cadastradas
- Filtros por:
  - Status (Pendente, Paga, Vencida, Cancelada)
  - Período (data de vencimento)
  - Categoria
  - Fornecedor
  - Valor (range)
- Ordenação por colunas
- Indicadores visuais de status:
  - Verde: Paga
  - Amarelo: A vencer
  - Vermelho: Vencida
  - Cinza: Cancelada
- Paginação

**2.2.3 Cadastro de Nova Conta**
- Formulário com campos:

**Informações da Conta:**
- Descrição/Nome da Despesa (obrigatório)
- Categoria (obrigatório)
  - Fornecedores
  - Salários/Folha de Pagamento
  - Aluguel
  - Energia Elétrica
  - Água
  - Internet/Telefone
  - Impostos
  - Compra de Peças
  - Manutenção
  - Marketing
  - Outros
- Fornecedor/Beneficiário (obrigatório)
- CNPJ/CPF do Fornecedor

**Valores e Datas:**
- Valor Original (obrigatório)
- Desconto
- Juros/Multa
- Valor Final (calculado automaticamente)
- Data de Emissão (obrigatório)
- Data de Vencimento (obrigatório)
- Data de Pagamento (preenchido ao pagar)

**Forma de Pagamento:**
- Dinheiro
- PIX
- Cartão de Crédito
- Cartão de Débito
- Boleto
- Transferência Bancária
- Cheque

**Detalhamento:**
- Número da Nota Fiscal/Documento
- Observações
- Anexar comprovantes (upload de arquivos)
- Recorrência (Única, Mensal, Anual)

**2.2.4 Pagamento de Conta**
- Botão de "Registrar Pagamento"
- Modal para confirmar:
  - Data do pagamento
  - Valor pago
  - Forma de pagamento
  - Comprovante (upload)
- Atualizar status automaticamente para "Paga"
- Calcular e aplicar juros se pago após vencimento

**2.2.5 Edição e Cancelamento**
- Permitir edição de contas pendentes
- Opção de cancelar conta com justificativa
- Histórico de alterações

**2.2.6 Relatórios**
- Exportar relatórios em PDF/Excel:
  - Contas pagas por período
  - Contas a vencer
  - Contas vencidas
  - Despesas por categoria
  - Análise de fluxo de caixa

#### 2.3 Validações Necessárias
- Valor maior que zero
- Data de vencimento não pode ser anterior à data de emissão
- Campos obrigatórios preenchidos
- Validação de CPF/CNPJ do fornecedor
- Não permitir excluir contas pagas (apenas cancelar)

#### 2.4 Componentes HeroUI Sugeridos
- `Input` - campos de texto e números
- `Button` - ações
- `Table` - listagem
- `Modal` - formulários e confirmações
- `Dropdown` - categorias e formas de pagamento
- `Card` - dashboard
- `Badge` - status das contas
- `DatePicker` - seleção de datas

---

### 3. MEU PERFIL

#### 3.1 Descrição Geral
Módulo de gerenciamento do perfil do usuário logado no sistema, permitindo visualizar e editar informações pessoais, preferências e configurações de conta.

#### 3.2 Funcionalidades Obrigatórias

**3.2.1 Visualização de Perfil**
- Foto de perfil (avatar)
- Informações exibidas:
  - Nome completo
  - E-mail
  - Telefone
  - Cargo/Função
  - Departamento
  - Data de cadastro
  - Último acesso
  - Status da conta (Ativo/Inativo)

**3.2.2 Edição de Dados Pessoais**
- Formulário editável com campos:

**Informações Básicas:**
- Foto de perfil (upload de imagem, max 2MB)
- Nome completo (obrigatório)
- E-mail (obrigatório, com validação)
- Telefone (com máscara)
- Celular/WhatsApp (com máscara)
- CPF (obrigatório, não editável após cadastro)
- Data de Nascimento

**Informações Profissionais:**
- Cargo/Função
- Departamento
- Data de Admissão
- Matrícula

**Endereço:**
- CEP (com busca automática)
- Logradouro
- Número
- Complemento
- Bairro
- Cidade
- Estado

**3.2.3 Alteração de Senha**
- Seção separada para segurança
- Campos:
  - Senha atual (obrigatório)
  - Nova senha (obrigatório)
  - Confirmar nova senha (obrigatório)
- Requisitos de senha:
  - Mínimo 8 caracteres
  - Pelo menos 1 letra maiúscula
  - Pelo menos 1 letra minúscula
  - Pelo menos 1 número
  - Pelo menos 1 caractere especial
- Indicador visual de força da senha

**3.2.4 Preferências do Sistema**
- Tema (Claro/Escuro)
- Idioma (para expansão futura)
- Notificações:
  - E-mail
  - Push
  - SMS
- Configurações de privacidade

**3.2.5 Informações de Segurança**
- Histórico de acessos:
  - Data e hora
  - Dispositivo
  - Localização (IP)
  - Navegador
- Sessões ativas
- Opção de encerrar todas as sessões

**3.2.6 Ações da Conta**
- Botão "Salvar Alterações"
- Botão "Cancelar" (descartar mudanças)
- Botão "Desativar Conta" (com confirmação)
- Link para "Política de Privacidade"
- Link para "Termos de Uso"

#### 3.3 Validações Necessárias
- E-mail válido e único no sistema
- CPF válido
- Telefone com formato válido
- Senha atual correta para alteração
- Nova senha atende aos requisitos mínimos
- Confirmação de senha igual à nova senha
- Imagem de perfil em formato válido (jpg, png, webp)
- Tamanho máximo de imagem: 2MB

#### 3.4 Componentes HeroUI Sugeridos
- `Input` - campos de texto
- `Button` - ações
- `Card` - seções do perfil
- `Avatar` - foto de perfil
- `Switch` - preferências
- `Modal` - confirmações
- `Tabs` - organização de seções

---

## 🎨 Diretrizes de UI/UX

### Layout Geral
- Design responsivo (mobile, tablet, desktop)
- Navegação consistente entre módulos
- Breadcrumbs para facilitar navegação
- Menu lateral ou superior com acesso aos três módulos

### Padrões Visuais
- Utilizar paleta de cores consistente do Tailwind CSS
- Espaçamento e alinhamento uniforme
- Feedback visual para todas as ações (loading, sucesso, erro)
- Mensagens de erro claras e amigáveis
- Tooltips explicativos quando necessário

### Acessibilidade
- Contraste adequado de cores (WCAG AA)
- Labels descritivos para leitores de tela
- Navegação por teclado funcional
- Foco visível em elementos interativos

### Performance
- Lazy loading de imagens e componentes
- Debounce em campos de busca
- Paginação para grandes volumes de dados
- Feedback de carregamento (spinners, skeletons)

---

## 🔧 Requisitos Técnicos

### Stack Tecnológico
- **Framework:** React 18.3.1
- **Build Tool:** Vite 6.0.11
- **Linguagem:** TypeScript 5.6.3
- **Roteamento:** React Router DOM 6.23.0
- **Componentes:** HeroUI 2.x
- **Estilização:** Tailwind CSS 4.1.11
- **Animações:** Framer Motion 11.18.2

### Estrutura de Pastas Sugerida
```
src/
├── pages/
│   ├── customers/
│   │   ├── CustomersList.tsx
│   │   ├── CustomerRegister.tsx
│   │   ├── CustomerEdit.tsx
│   │   └── CustomerDetails.tsx
│   ├── accounts-payable/
│   │   ├── FinancialDashboard.tsx
│   │   ├── AccountsList.tsx
│   │   ├── AccountRegister.tsx
│   │   └── AccountDetails.tsx
│   └── profile/
│       ├── MyProfile.tsx
│       └── ChangePassword.tsx
├── components/
│   ├── common/
│   ├── customers/
│   ├── accounts/
│   └── profile/
├── hooks/
├── services/
│   └── api/
├── utils/
│   ├── validations.ts
│   ├── formatters.ts
│   └── constants.ts
├── types/
└── styles/
```

### Integrações Necessárias
- **API de CEP:** ViaCEP ou similar para busca automática de endereços
- **Validação de CPF/CNPJ:** Biblioteca de validação
- **Upload de Arquivos:** Implementar sistema de upload (S3, Firebase, ou local)
- **Formatação de Dados:** Máscaras para CPF, CNPJ, telefone, CEP, etc.

### Validações e Máscaras
- CPF: XXX.XXX.XXX-XX
- CNPJ: XX.XXX.XXX/XXXX-XX
- Telefone: (XX) XXXXX-XXXX
- CEP: XXXXX-XXX
- Placa: XXX-XXXX (Mercosul) ou XXX-9999 (antiga)
- Valores monetários: R$ X.XXX,XX

---

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Adaptações por Dispositivo
- **Mobile:**
  - Menu hamburguer
  - Tabelas transformadas em cards
  - Formulários em coluna única
  - Botões em largura total

- **Tablet:**
  - Menu lateral recolhível
  - Tabelas com scroll horizontal se necessário
  - Formulários em duas colunas

- **Desktop:**
  - Menu lateral fixo ou superior
  - Tabelas completas
  - Formulários em múltiplas colunas
  - Uso otimizado do espaço

---

## 🔐 Considerações de Segurança

### Autenticação e Autorização
- Sistema de login (JWT ou similar) - *a ser definido com backend*
- Controle de permissões por módulo
- Sessão com timeout automático
- Logout em todas as sessões

### Proteção de Dados
- Validação de inputs no frontend
- Sanitização de dados
- Proteção contra XSS
- Criptografia de senhas

---

## 📊 Métricas e Relatórios

### Clientes
- Total de clientes cadastrados
- Clientes ativos vs inativos
- Clientes cadastrados por período

### Contas a Pagar
- Total de despesas por mês
- Despesas por categoria
- Taxa de pagamentos em dia vs atrasados
- Projeção de despesas

---

## 🚀 Entregas Esperadas

### Fase 1 - MVP (Produto Mínimo Viável)
1. ✅ Módulo de Cadastro de Clientes (CRUD completo)
2. ✅ Módulo de Contas a Pagar (CRUD completo)
3. ✅ Módulo Meu Perfil (visualização e edição básica)
4. ✅ Navegação entre módulos
5. ✅ Responsividade mobile/desktop

### Fase 2 - Melhorias
1. Dashboard com gráficos
2. Relatórios e exportações
3. Sistema de notificações
4. Histórico de alterações
5. Backup e restauração de dados

### Fase 3 - Expansão (Futuro)
1. Módulo de Ordem de Serviço
2. Módulo de Estoque de Peças
3. Módulo de Contas a Receber
4. Agenda de Atendimentos
5. Relatórios avançados e Business Intelligence

---

## 📝 Observações Importantes

1. **Dados Fictícios:** Utilizar dados de exemplo durante o desenvolvimento para testes
2. **Backend:** Este documento foca no frontend. A integração com backend será definida posteriormente
3. **Estado Global:** Avaliar uso de Context API, Redux ou Zustand para gerenciamento de estado
4. **Testes:** Implementar testes unitários e de integração (Jest, React Testing Library)
5. **Documentação:** Manter código documentado com comentários e tipos TypeScript
6. **Git:** Seguir convenção de commits semânticos
7. **Code Review:** Todo código deve passar por revisão antes do merge

---

## 📞 Contatos

**Departamento Comercial:** [comercial@empresa.com]  
**Product Manager:** [pm@empresa.com]  
**Tech Lead Front-End:** [frontend@empresa.com]

---

## ✅ Aprovação

**Cliente:** ___________________________  
**Data:** ___/___/______

**Product Manager:** ___________________________  
**Data:** ___/___/______

---

*Documento gerado pelo Departamento Comercial - versão 1.0*

