# Pet Rações Atacado

E-commerce moderno para venda de rações e acessórios para pets no atacado.

## Tecnologias

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (ícones)

### Backend
- Node.js
- Express
- JWT (autenticação)
- bcryptjs (hash de senhas)

## Estrutura do Projeto

```
pet-racoes-atacado/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── context/      # Contextos (Cart, Auth)
│   │   ├── hooks/        # Hooks customizados
│   │   └── services/     # Serviços de API
│   └── ...
│
├── backend/           # API Node.js
│   └── src/
│       ├── routes/       # Rotas da API
│       ├── controllers/  # Lógica de negócio
│       ├── middleware/   # Middlewares
│       └── data/         # Dados (produtos.json)
│
└── README.md
```

## Instalação

### Pré-requisitos
- Node.js 18+ instalado

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### Backend

```bash
cd backend
npm install
npm run dev
```

A API estará disponível em `http://localhost:3001`

## API Endpoints

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Retorna um produto específico
- `GET /api/products/category/:category` - Produtos por categoria
- `GET /api/products/search?q=termo` - Busca de produtos

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário autenticado

### Frete
- `POST /api/freight/calculate` - Calcula frete por CEP

## Funcionalidades

- [x] Página inicial com banner e categorias
- [x] Grid de produtos com filtros
- [x] Página de detalhes do produto
- [x] Carrinho de compras (persistido no localStorage)
- [x] Cálculo de frete por CEP
- [x] Login e cadastro de usuários
- [x] Design responsivo (mobile-first)
- [x] Widget de chatbot (estrutura visual)

## Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Primária | `#2563EB` | Botões, links, destaques |
| Primária Dark | `#1D4ED8` | Hover states |
| Primária Light | `#DBEAFE` | Backgrounds suaves |
| Sucesso | `#10B981` | Confirmações |
| Erro | `#EF4444` | Erros, alertas |

## Próximos Passos

- [ ] Integração com gateway de pagamento
- [ ] Integração com API dos Correios
- [ ] Implementação do chatbot com IA
- [ ] Painel administrativo
- [ ] Sistema de avaliações de produtos
