# FocusMine Design System

A comprehensive design system built with CSS custom properties for consistent theming across the FocusMine application.

## 📋 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Transitions](#transitions)
7. [Usage Guidelines](#usage-guidelines)

---

## 🎨 Color Palette

### Brand Colors
```css
--brand-primary: oklch(0.55 0.2 260);      /* Blue */
--brand-primary-light: oklch(0.65 0.2 260);
--brand-primary-dark: oklch(0.45 0.2 260);
--brand-secondary: oklch(0.55 0.2 300);    /* Purple */
--brand-accent: oklch(0.6 0.2 280);
```

### Semantic Colors
```css
--success: oklch(0.6 0.15 150);     /* Green */
--warning: oklch(0.7 0.15 80);      /* Yellow */
--error: oklch(0.55 0.2 25);        /* Red */
--info: oklch(0.6 0.15 240);        /* Blue */
```

### UI Primitives
- `--background` / `--foreground`: Base page colors
- `--surface` / `--surface-elevated`: Card/container backgrounds
- `--primary` / `--secondary`: Action colors
- `--muted` / `--muted-foreground`: Subtle text and backgrounds
- `--border` / `--input`: Form elements
- `--ring`: Focus states

---

## 📝 Typography

### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
```

### Usage
```tsx
<h1 className="text-3xl font-bold">Heading</h1>
<p className="text-base text-muted-foreground">Body text</p>
```

---

## 📏 Spacing

Based on a 4px grid system:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Usage
```tsx
<div className="p-4 gap-2">Content</div>
<div className="m-6">Margin</div>
```

---

## 🔲 Border Radius

```css
--radius-sm: calc(var(--radius) - 4px);   /* 6px */
--radius-md: calc(var(--radius) - 2px);   /* 8px */
--radius-lg: var(--radius);                /* 10px */
--radius-xl: calc(var(--radius) + 4px);   /* 14px */
--radius-2xl: calc(var(--radius) + 8px);  /* 18px */
--radius-full: 9999px;                     /* Circle/Pill */
```

### Usage
```tsx
<Button className="rounded-lg">Button</Button>
<div className="rounded-full">Avatar</div>
```

---

## 🌑 Shadows

### Light Mode
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Usage
```tsx
<Card className="shadow-md">Card</Card>
<div className="shadow-lg">Elevated</div>
```

---

## ⚡ Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Usage
```tsx
<Button className="transition-colors">Button</Button>
<div className="transition-all hover-lift">Animated</div>
```

---

## 📖 Usage Guidelines

### ✅ DO:
- Use semantic color variables (`--success`, `--error`, etc.)
- Stick to the spacing scale
- Use shadows for elevation hierarchy
- Apply transitions consistently
- Test in both light and dark modes

### ❌ DON'T:
- Use hardcoded color values
- Mix gradient backgrounds excessively
- Create custom spacing values
- Skip dark mode testing
- Use multiple transition timings

---

## 🎯 Component Examples

### Cards
```tsx
<Card className="bg-surface shadow-md rounded-lg">
  <CardHeader>
    <CardTitle className="text-xl font-bold">Title</CardTitle>
  </CardHeader>
  <CardContent className="text-foreground">
    Content
  </CardContent>
</Card>
```

### Buttons
```tsx
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Avatars
```tsx
<Avatar>
  <AvatarFallback className="bg-primary text-primary-foreground">
    JD
  </AvatarFallback>
</Avatar>
```

---

## 🌓 Dark Mode

All colors automatically adapt to dark mode using the `.dark` class. The design system handles color inversion and contrast adjustments automatically.

```tsx
<div className="bg-background text-foreground">
  {/* Automatically adapts to dark mode */}
</div>
```

---

## 📦 File Structure

```
styles/
├── globals.css          # Design system & global styles
└── (other styles)

components/
├── theme-switcher.tsx   # Reusable theme toggle
├── language-switcher.tsx # Reusable language toggle
└── (other components)
```

---

## 🔧 Customization

To customize the design system:

1. Edit `styles/globals.css`
2. Update CSS custom properties in `:root` and `.dark`
3. Changes apply globally across the application

---

**Last Updated:** March 2026  
**Version:** 1.0.0
