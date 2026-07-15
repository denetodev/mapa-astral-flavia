# Mapa Astral de Uma Trajetória Extraordinária

Landing page de despedida da **Flávia Alves Brito Nunes** — Gerente Executiva do CRM no Banco do Brasil, com todo carinho da equipe DIMAC/CRM.

Site estático, sem build, pronto pra jogar em qualquer host (GitHub Pages, Netlify, Vercel, S3).

---

## Estrutura

```
despedida-flavia/
├── index.html          # única página
├── style.css           # estilos (design tokens + layout + animações)
├── script.js           # reveal-on-scroll (IntersectionObserver)
└── assets/
    ├── fotos/          # 11 fotos da Flávia (JPGs otimizados)
    └── ilustracoes/    # 6 ilustrações astrais (WebP com transparência)
```

Peso total: ~1.7MB (com lazy-loading em quase tudo).

---

## Deploy no GitHub Pages

1. Cria o repositório (pode ser privado; GitHub Pages funciona em privado no plano gratuito também).
2. Sobe todos os arquivos na raiz:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page despedida Flávia"
   git remote add origin https://github.com/<seu-user>/<repo>.git
   git push -u origin main
   ```
3. No GitHub → **Settings → Pages** → Branch: `main` → Folder: `/ (root)` → Save.
4. A URL sai em ~1min: `https://<seu-user>.github.io/<repo>/`

### URL bonita (opcional)
Se quiser um domínio próprio (tipo `flavinha.deneto.dev`), configura CNAME nas configurações do GitHub Pages e aponta o DNS.

---

## O que customizar antes de mandar

Abre o `index.html` e ajusta essas partes rápido:

1. **Data no eyebrow do hero** (linha ~30): mudar `"Uma leitura celestial · Novembro, 2026"` pra data real do evento.
2. **Assinatura no rodapé** (busca por `finale__signature-text`): confirmar se é "Equipe DIMAC · CRM" ou se quer nomes específicos.
3. **Meta tags de compartilhamento** (topo do `<head>`): se rolar preview no WhatsApp/LinkedIn.

Textos dos capítulos ficam no HTML mesmo, `<p>` puro — edita direto.

---

## Decisões de design (pra quem for iterar)

- **Cinzel** no display + **Cormorant Garamond** no body — pareamento pensado pra tema celestial/astrológico, não é template.
- **Roda zodiacal SVG animada** no hero é o *signature element* — não é decoração, é literal ao conceito de mapa astral. Ela gira ~4min pra completar uma volta (240s), com os símbolos girando em sentido contrário pra continuarem legíveis.
- **Paleta**: dois tons dominantes (azul-noite + dourado antigo) + terracota da Bahia usado *só* na seção do Interlúdio (raízes/pimenta). Restrição intencional — cor tem que significar algo.
- **Algarismos romanos** (I → V) porque a sequência temporal é *real*. Se fosse só decorativo, não usaria.
- Todas as animações respeitam `prefers-reduced-motion` — quem tiver reduzido, vê tudo estático mas legível.

---

## Performance

- Ilustrações em WebP (~87% menores que PNG original).
- Fotos JPG progressivo, redimensionadas pra max 1000px.
- `loading="lazy"` em toda imagem que não seja acima da dobra.
- Fontes com `display=swap` — texto aparece com fallback enquanto Cinzel carrega.

Lighthouse esperado: 90+ em performance, 100 em acessibilidade.

---

## CTA do email

No email marketing (SFMC/Mautic), o botão deve apontar direto pra URL do GitHub Pages. Copy sugerida:

> **Uma mensagem sua está nas estrelas.**
> Clique pra abrir sua carta →

Ou algo com a mesma pegada astrológica — combinar com o resto do email.

---

Feito por Neto (deneto.dev) para a equipe DIMAC/CRM · BB · 2026.
