# 📚 Sistema de Biblioteca Escolar

**Curso:** Sistemas de Informação - Universidade Federal de Santa Catarina (UFSC)
**Autores:** Yasmim de Cássia Normanha Silva (22104162) e Gabriel de Paula Góes (24203159)
Link repositório do projeto: `https://github.com/Gabriel-D-Goes/projeto-Web.git`
`https://projetobiblioteca-gamma.vercel.app/`
<<<<<<< HEAD
=======

>>>>>>> 46b128f1d3f53e5b5d83000041a8df67f8823ff0

## 📝 Descrição do Projeto
Aplicação Web desenvolvida para gerenciamento e intermediação de aluguel de livros didáticos e literários. O sistema conta com um ecossistema completo composto por:

- **Back-end (Node.js/Express):** API com rotas de autenticação e geração de tokens JWT para controle de sessão.
- **Front-end (React/Vite):** Interface dinâmica com transições suaves (Glassmorphism/Card UI) e sistema de rotas.
- **Personalização por Escolaridade:** Mecanismo inteligente que lê o perfil do usuário logado (via Token) e filtra o acervo exibido na tela inicial.
- **Fórum de Discussão Dinâmico:** Fórum segmentado por série, integrado no front-end utilizando persistência via `localStorage`.
- **Integração com WhatsApp:** Canal direto de comunicação em tempo real via API do WhatsApp para o aluguel das obras.

## 🚀 Como rodar o projeto localmente

1. Extraia o arquivo `.zip` ou faça o clone do repositório.
2. Acesse a pasta `back-end`, abra o terminal, rode `npm install` e inicie o servidor com `node server.js`.
3. Acesse a pasta `front-end` em outro terminal, rode `npm install` e inicie a interface com `npm run dev`.
4. Acesse `http://localhost:5173` no navegador.
