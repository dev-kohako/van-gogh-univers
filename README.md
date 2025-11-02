# **🎨 Van Gogh Univers**

>*“A arte é o caminho mais curto entre o homem e ele mesmo.” — Van Gogh*  
Uma imersão interativa na vida, na obra e no universo emocional de Vincent van Gogh — unindo tecnologia, design e emoção.

# **📖 Visão Geral**

Van Gogh Univers é uma plataforma interativa e imersiva desenvolvida em Next.js 15 / React 18, combinando arte e tecnologia em uma experiência única de exploração 3D.
Inspirada na genialidade de Van Gogh, a aplicação oferece uma jornada visual pelas suas obras, com animações dinâmicas, ambiente tridimensional, transições suaves e uma curadoria artística envolvente.

Este projeto foi concebido para unir performance, acessibilidade e estética, respeitando a obra de Van Gogh enquanto a reinterpreta através da lente da engenharia moderna.

# **🧩 Principais Funcionalidades**

| Categoria | Descrição |
| - | - |
| 🖼️ **Galeria Dinâmica**       |  Exibição inteligente das pinturas, com filtros, paginação, busca e ordenação por nome ou data.  |
| 🌌 **Ambiente 3D Imersivo** | Cena interativa construída com React Three Fiber e Drei, permitindo explorar o modelo 3D de Van Gogh em rotação completa no eixo X.     |
| 🎭 **Página de Detalhes** | Cada pintura possui uma página dedicada, com informações históricas, dimensões, técnica, cores predominantes e curiosidades.     |
| ⚙️ **Animações Suaves** | Transições refinadas com Framer Motion, criando uma sensação fluida e cinematográfica.     |
| **🌙 Modo Escuro Dinâmico** | Estilo adaptativo inspirado nas paletas vibrantes e contrastes do pós-impressionismo.     |
| 🧠 **Acessibilidade e UX** | ARIA labels, navegação por teclado e hierarquia semântica completa.     |
| 🧪 **Testes Automatizados** | Estrutura de testes com Jest e Testing Library, cobrindo componentes críticos e fluxo de navegação.     |
     
# ⚙️ **Tecnologias Utilizadas**

| Stack | Ferramentas e bibliotecas principais |
| - | - |
| **Frontend** | Next.js 15 · React 18 · TypeScript · TailwindCSS · Shadcn/UI |
| **Animações e 3D** | Framer Motion · React-Three-Fiber · @react-three/drei · Three.js |
| **Testes** | Jest · @testing-library/react |
| **Infra e DevTools** | Bun · ESLint · Prettier · Husky · lint-staged |

# 🏗️ **Arquitetura do Projeto**

<pre>
src/
├── app/
│   ├── about/                       → Página "Sobre o Van Gogh Univers"
│   │   └── components/
│   │       └── VanGogh3DCard/       → Modelo 3D e interações
│   ├── gallery/                     → Galeria de pinturas
│   │   ├── components/
│   │   └── page.tsx
│   ├── paintings/                   → Listagem principal de obras
│   │   ├── usePaintings.ts
│   │   └── page.tsx
│   ├── paintingsDetails/[id]/       → Página de detalhes da obra
│   │   ├── components/
│   │   │   ├── Painting3DViewer.tsx
│   │   │   ├── PaintingPalette.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   ├── PaintingDetails.tsx
│   │   │   ├── FullscreenImageViewer.tsx
│   │   │   └── PaintingImage.tsx
│   │   ├── usePaintingDetails.ts
│   │   └── page.tsx
│   ├── not-found.tsx                → Página 404 artística
│   ├── error.tsx                    → Página de erro com botão reset
│   ├── layoutWrapper.tsx            → Animações e estrutura global
│   ├── theme-provider.tsx           → Gerenciador de temas
│   ├── loading.tsx                  → Loader visual dinâmico
│   └── globals.css
│
├── components/
│   ├── ui/                          → Base Shadcn/UI + custom (AppSidebar, Carousel, etc.)
│   ├── empty-section.tsx
│   ├── toggleDarkMode.tsx
│   ├── theme-provider.tsx
│   └── PaintingCarousel.tsx
│
├── lib/
│   └── utils.ts                     → Funções auxiliares globais
│
├── types/
│   ├── about.type.ts
│   ├── galleryTypes.type.ts
│   ├── homePage.type.ts
│   ├── paintingDetails.type.ts
│   └── types.ts
│
└── scripts/
    └── process-images.ts            → Processamento e otimização de imagens
</pre>

# 🚀 **Instalação e Execução**

### 💻 Pré-requisitos
- **Node.js** >= 20 ou **Bun**
- **npm**, **pnpm** ou **bun** como gerenciador de pacotes

---

```bash
Instalar dependências
bun install
```
```bash
Executar em modo desenvolvimento
bun dev
```
```bash
Gerar build de produção
bun run build
```
```bash
Rodar testes
bun run test
```

# **🔍 Boas Práticas Adotadas**

- Arquitetura modular e escalável, com separação clara entre UI, lógica e dados.  
- Performance-first design: uso de Suspense, lazy loading e dynamic imports.  
- Imagens otimizadas via next/image com blurDataURL.  
- Acessibilidade (WCAG 2.1): foco visível, ARIA roles e contraste de cor.  
- SEO otimizado: metadados dinâmicos, Open Graph e estrutura semântica.  

# **✨ Detalhes Artísticos**
Cada página e transição foi projetada com base em princípios visuais de Van Gogh:  
- Movimento constante (Framer Motion) evocando o ritmo de suas pinceladas.  
- Paleta cromática viva, contrastando amarelos solares e azuis noturnos.  
- Ambiente 3D simbólico, representando o artista como figura etérea em meio ao seu próprio   universo.

# **🧪 Testes Implementados**

- Renderização de componentes de UI com @testing-library/react  
- Testes de hooks e comportamento de estado com mocks  
- Validação de rotas dinâmicas (/paintings/[id])  
- Simulação de falhas e mensagens de erro  
- Cobertura automatizada via jest --coverage

# **📜 Contribuindo**

Contribuições são **bem-vindas e encorajadas!**  
O **Van Gogh Univers** é um projeto público, e toda colaboração que mantenha seu espírito artístico e técnico é valorizada.

1. Faça um **fork** do repositório.

2. Crie sua branch de feature:
```bash
git checkout -b feat/nome-da-feature
```

3. Faça suas alterações e commit:
```bash
git commit -m "feat: descrição clara da mudança"
```

4. Envie sua branch e abra um **Pull Request:**
```bash
git push origin feat/nome-da-feature
```

>💡 PRs são revisados com base em clareza, legibilidade, consistência visual e fidelidade à identidade do projeto.
Sempre que possível, inclua capturas de tela, gifs ou exemplos do resultado final.

# **🗂️ Licença**

**Copyright © 2025 Joseph Kawe (KWK Technologies)**  
Licenciado sob a **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**

Você tem permissão para:

- **Visualizar** e **compartilhar** este projeto publicamente.  
- Fazer fork e sugerir melhorias por meio de Pull Requests.  
- Usar o código como referência para aprendizado ou inspiração pessoal.  
**Sob as seguintes condições:**  
- **Atribuição:** deve-se creditar Joseph Kawe (KWK Technologies) como criador original.  
- **Uso não comercial:** é proibido qualquer uso comercial deste projeto, total ou parcial.  
- **Sem obras derivadas:** não é permitido distribuir versões modificadas sem autorização prévia.
Esta licença garante a integridade artística e técnica do projeto, incentivando a colaboração e o aprendizado sem comprometer a identidade criativa.

Para solicitações de **licenciamento**, **colaboração comercial** ou **uso institucional**, entre em contato:
📧 kwktech.contact@gmail.com
 · josephkawe000@gmail.com

 **🖼️ Créditos artísticos:** obras originais de **Vincent Van Gogh**, domínio público (Wikimedia Commons).

# **🌟 Agradecimentos**

- À genialidade de **Vincent Van Gogh**, por inspirar a fusão entre arte e código.  
- À comunidade open-source, pela base sólida de conhecimento e ferramentas.  
- E a todos que acreditam que **tecnologia também é arte.**

# **🧩 Resumo**  
**Van Gogh Univers** é mais que um site — é uma homenagem técnica e emocional ao artista que transformou dor em beleza.  
Cada linha de código foi escrita com o mesmo propósito que guiou o pincel de Van Gogh: **dar vida à luz.**
