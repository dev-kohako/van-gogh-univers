# **🎨 Van Gogh Univers**

>*“Art is the shortest path between man and himself.” — Van Gogh*  
An interactive immersion into the life, work, and emotional universe of Vincent van Gogh — blending technology, design, and emotion.

# **📖 Overview**

Van Gogh Univers is an interactive and immersive platform developed with Next.js 15 / React 18, combining art and technology into a unique 3D exploration experience.  
Inspired by Van Gogh’s genius, the application offers a visual journey through his masterpieces, with dynamic animations, a tridimensional environment, smooth transitions, and an engaging artistic curation.

This project was designed to unite performance, accessibility, and aesthetics — honoring Van Gogh’s legacy while reinterpreting it through the lens of modern engineering.

# **🧩 Main Features**

| Category | Description |
| - | - |
| 🖼️ **Dynamic Gallery** | Smart display of paintings, with filters, pagination, search, and sorting by name or date. |
| 🌌 **Immersive 3D Environment** | Interactive scene built with React Three Fiber and Drei, allowing exploration of the 3D Van Gogh model with full X-axis rotation. |
| 🎭 **Detail Page** | Each painting has a dedicated page with historical information, dimensions, technique, predominant colors, and curiosities. |
| ⚙️ **Smooth Animations** | Refined transitions powered by Framer Motion, creating a cinematic and fluid experience. |
| 🌙 **Dynamic Dark Mode** | Adaptive style inspired by the vibrant palettes and contrasts of post-impressionism. |
| 🧠 **Accessibility & UX** | ARIA labels, keyboard navigation, and complete semantic hierarchy. |
| 🧪 **Automated Tests** | Test structure with Jest and Testing Library, covering critical components and navigation flow. |

# ⚙️ **Tech Stack**

| Layer | Main tools and libraries |
| - | - |
| **Frontend** | Next.js 15 · React 18 · TypeScript · TailwindCSS · Shadcn/UI |
| **Animations & 3D** | Framer Motion · React-Three-Fiber · @react-three/drei · Three.js |
| **Testing** | Jest · @testing-library/react |
| **Infra & DevTools** | Bun · ESLint · Prettier · Husky · lint-staged |

# 🏗️ **Project Architecture**

<pre>
src/
├── app/
│   ├── about/                       → "About Van Gogh Univers" page
│   │   └── components/
│   │       └── VanGogh3DCard/       → 3D model and interactions
│   ├── gallery/                     → Paintings gallery
│   │   ├── components/
│   │   └── page.tsx
│   ├── paintings/                   → Main list of artworks
│   │   ├── usePaintings.ts
│   │   └── page.tsx
│   ├── paintingsDetails/[id]/       → Artwork detail page
│   │   ├── components/
│   │   │   ├── Painting3DViewer.tsx
│   │   │   ├── PaintingPalette.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   ├── PaintingDetails.tsx
│   │   │   ├── FullscreenImageViewer.tsx
│   │   │   └── PaintingImage.tsx
│   │   ├── usePaintingDetails.ts
│   │   └── page.tsx
│   ├── not-found.tsx                → Artistic 404 page
│   ├── error.tsx                    → Error page with reset button
│   ├── layoutWrapper.tsx            → Global layout and animations
│   ├── theme-provider.tsx           → Theme manager
│   ├── loading.tsx                  → Dynamic visual loader
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
│   └── utils.ts                     → Global utility functions
│
├── types/
│   ├── about.type.ts
│   ├── galleryTypes.type.ts
│   ├── homePage.type.ts
│   ├── paintingDetails.type.ts
│   └── types.ts
│
└── scripts/
    └── process-images.ts            → Image processing and optimization
</pre>

# 🚀 **Installation and Execution**

### 💻 Prerequisites
- **Node.js** >= 20 or **Bun**
- **npm**, **pnpm**, or **bun** as package manager

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

# **🔍 Best Practices Adopted**

- Modular and scalable architecture with clear separation between UI, logic, and data.  
- Performance-first design: use of Suspense, lazy loading, and dynamic imports.  
- Optimized images via next/image with blurDataURL.  
- Accessibility (WCAG 2.1): visible focus, ARIA roles, and proper color contrast.  
- SEO optimization: dynamic metadata, Open Graph, and semantic structure.  

# **✨ Artistic Details**

Each page and transition was designed based on Van Gogh’s visual principles:  
- Constant movement (Framer Motion) evoking the rhythm of his brushstrokes.  
- Vivid chromatic palette contrasting solar yellows and nocturnal blues.  
- Symbolic 3D environment representing the artist as an ethereal figure within his own universe.  

# **🧪 Implemented Tests**

- UI component rendering with @testing-library/react  
- Hook and state behavior testing with mocks  
- Dynamic route validation (/paintings/[id])  
- Failure simulation and error messages  
- Automated coverage via jest --coverage  

# **📜 Contributing**

Contributions are **welcome and encouraged!**  
**Van Gogh Univers** is a public project, and every collaboration that maintains its artistic and technical spirit is valued.

1. **Fork** the repository.  
2. Create your feature branch:  
   `git checkout -b feat/feature-name`  
3. Make your changes and commit:  
   `git commit -m "feat: clear description of the change"`  
4. Push your branch and open a **Pull Request:**  
   `git push origin feat/feature-name`  

> 💡 PRs are reviewed based on clarity, readability, visual consistency, and fidelity to the project’s identity.  
> Whenever possible, include screenshots, GIFs, or examples of the final result.

# **🗂️ License**

**Copyright © 2025 Joseph Kawe (KWK Technologies)**  
Licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**

You are allowed to:

- **View** and **share** this project publicly.  
- Fork and suggest improvements via Pull Requests.  
- Use the code as a reference for learning or personal inspiration.  

**Under the following conditions:**  
- **Attribution:** credit must be given to Joseph Kawe (KWK Technologies) as the original creator.  
- **Non-commercial use:** any commercial use of this project, in whole or in part, is prohibited.  
- **No derivatives:** distributing modified versions without prior authorization is not allowed.  

This license preserves the artistic and technical integrity of the project, encouraging collaboration and learning without compromising its creative identity.

For **licensing**, **commercial collaboration**, or **institutional use** inquiries, please contact:  
📧 kwktech.contact@gmail.com  
· josephkawe000@gmail.com  

**🖼️ Artistic credits:** original artworks by **Vincent Van Gogh**, public domain (Wikimedia Commons).  

# **🌟 Acknowledgments**

- To the genius of **Vincent Van Gogh**, for inspiring the fusion between art and code.  
- To the open-source community, for the solid foundation of knowledge and tools.  
- And to all who believe that **technology is also art.**  

# **🧩 Summary**

**Van Gogh Univers** is more than a website — it is a technical and emotional tribute to the artist who turned pain into beauty.  
Every line of code was written with the same purpose that guided Van Gogh’s brush: **to bring light to life.**