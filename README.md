# Hire — Real Estate SPA

Современный адаптивный SPA-лендинг агентства недвижимости **Hire**,
переписанный с legacy HTML/SCSS + Swiper на **Vite + React 18 + Tailwind CSS 4 + Framer Motion**.

## Стек

- **Vite 6** — сборщик и dev-сервер
- **React 18** (JavaScript, JSX) — компонентная архитектура
- **Tailwind CSS 4** — стилизация через `@tailwindcss/vite` (дизайн-токены в `@theme`)
- **Framer Motion** — плавные анимации появления, слайдеры, микроинтеракции

## Команды

```bash
npm install      # установка зависимостей
npm run dev      # dev-сервер (http://localhost:5173)
npm run build    # продакшен-сборка в dist/
npm run preview  # предпросмотр продакшен-сборки
```

## Структура

```
src/
├── App.jsx                 # композиция страницы
├── main.jsx                # точка входа
├── index.css               # Tailwind 4 (@theme-токены, keyframes)
├── data/site.js            # весь контент: ссылки, объекты, отзывы, галерея
├── hooks/useLockBody.js    # блокировка скролла (мобильное меню)
└── components/
    ├── Header.jsx          # sticky-хедер, бургер-меню с анимацией
    ├── Hero.jsx            # заголовок + анимированный фильтр поиска
    ├── FilterSelect.jsx    # кастомный дропдаун фильтра
    ├── FeaturedIn.jsx      # бесконечное marquee логотипов
    ├── Popular.jsx         # карусель объектов (scroll-snap + стрелки)
    ├── Why.jsx             # преимущества с пульсирующими иконками
    ├── Reviews.jsx         # слайдер отзывов (AnimatePresence)
    ├── Gallery.jsx         # две колонки с Ken Burns кроссфейдом
    ├── Begin.jsx           # CTA с отрисовкой SVG-волн
    ├── Footer.jsx          # подвал с соцсетями
    ├── Reveal.jsx          # reveal-обёртка для секций
    └── icons.jsx           # SVG-иконки (auto-generated, currentColor)
public/img/                 # ассеты из оригинального шаблона
legacy/                     # исходный HTML/SCSS/CSS/JS (для справки)
scripts/extract-icons.mjs   # генератор icons.jsx из legacy-разметки
```

## Анимации

- Hero: staggered fade-up заголовка/текста/фильтра, вход изображения, парящие декоративные квадраты
- Секции: reveal при скролле (`whileInView`, once)
- Кнопка поиска: спиннер + смена подписи
- Featured In: бесконечная marquee-лента (пауза при наведении)
- Карточки объектов: hover-zoom изображения, подъём при появлении
- Почему мы: пульсирующие круги вокруг иконок
- Отзывы: направленный слайд/фейд между цитатами
- Галерея: кроссфейд с эффектом Ken Burns (медленный zoom)
- CTA: SVG-волны отрисовываются через `pathLength`, ступенчатые квадраты въезжают с задержкой

## Примечания

- Все ассеты и тексты перенесены из оригинального шаблона без изменений.
- `src/components/icons.jsx` сгенерирован скриптом `scripts/extract-icons.mjs`
  из legacy-разметки; при необходимости перегенерируется командой
  `node scripts/extract-icons.mjs`.
