# A3Front - Sistema de Controle de Estoque

Frontend desenvolvido para a A3 de Sistemas Distribuidos e Mobile, focado no gerenciamento de estoque de produtos. O sistema permite o cadastro de categorias, produtos, registro de movimentações (entradas e saídas) e visualização de relatórios gerenciais.

Este projeto foi construído utilizando **React**, **TypeScript** e **Vite**, consumindo uma API REST desenvolvida em Java/Spring Boot (A3Back).

## 🚀 Funcionalidades

- **Dashboard**: Visão geral com estatísticas de categorias, produtos, movimentações e valor total em estoque.
- **Gerenciamento de Categorias**: Cadastro, edição e remoção de categorias de produtos.
- **Gerenciamento de Produtos**: Cadastro completo de produtos com controle de estoque mínimo e máximo.
- **Controle de Movimentações**: Registro de entradas e saídas de produtos no estoque.
- **Relatórios**:
  - Lista de Preços
  - Balanço de Estoque (Valor total)
  - Produtos Abaixo do Estoque Mínimo
  - Produtos por Categoria
  - Maiores Movimentações

## 🛠️ Tecnologias Utilizadas

- **React** (v19)
- **TypeScript**
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Navegação entre páginas
- **Axios** - Cliente HTTP para comunicação com o Backend
- **CSS3** - Estilização com variáveis (Dark Mode)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- O backend **A3Back** deve estar rodando na porta `8080`.

## 🔰 Guia para Node.js

Se você não tem o Node.js instalado (ou não sabe o que é npm), siga estes passos:

1.  Acesse o site oficial: [nodejs.org](https://nodejs.org/).
2.  Baixe a versão **LTS** (Long Term Support), que é a mais estável.
3.  Execute o instalador e siga as instruções (pode clicar em "Next" em tudo).
4.  Após instalar, reinicie seu computador (ou feche e abra o terminal/CMD).
5.  Para verificar se instalou corretamente, abra o CMD (Prompt de Comando) e digite:
    ```bash
    node -v
    ```
    Se aparecer um número de versão (ex: `v18.16.0`), está tudo pronto!

## 🔧 Instalação e Execução

### Opção 1: Via Script Automático (Windows)

Basta dar um duplo clique no arquivo `run.bat` na raiz do projeto. Ele irá:
1. Verificar se o Node.js está instalado.
2. Instalar as dependências automaticamente (se necessário).
3. Iniciar o projeto.

### Opção 2: Via Terminal (Manual)

1. Clone o repositório (se aplicável) ou acesse a pasta do projeto:
   ```bash
   cd A3Front
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. O projeto estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 📂 Estrutura do Projeto

```
src/
├── assets/         # Imagens e recursos estáticos
├── pages/          # Componentes das páginas (Home, Produtos, etc.)
├── services/       # Configuração do Axios e chamadas à API
├── types/          # Definições de tipos TypeScript (Interfaces)
├── App.tsx         # Componente principal e rotas
├── index.css       # Estilos globais e tema
└── main.tsx        # Ponto de entrada da aplicação
```

## 🔗 Integração com Backend

Certifique-se de que o projeto **A3Back** esteja em execução e com o banco de dados MySQL configurado corretamente para que todas as funcionalidades operem como esperado.