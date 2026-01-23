# Neobrutalism Design System - EduFlow

## Design Philosophy

This EdTech platform has been completely redesigned with a **neobrutalism aesthetic** - bold, raw, and unapologetic. The design combines vibrant pop colors with thick borders, high contrast, and energetic typography to create a modern, playful yet professional learning experience.

## Color Palette

**Primary Pop Colors:**
- **Hot Pink/Neon Pink** (`#ff006e`) - Primary action buttons, highlights, energy
- **Cyan/Electric Blue** (`#00d9ff`) - Secondary accent, category buttons, focus states
- **Bright Yellow/Lemon** (`#ffbe0b`) - Tertiary accent, calls-to-action, emphasis
- **Black** (`#1a1a1a`) - Text, borders, strong contrast
- **White** (`#ffffff`) - Background, cards, main surface

**Neutral Gray:**
- **Light Gray** (`#f0f0f0`) - Muted backgrounds, inactive states
- **Medium Gray** (`#666666`) - Secondary text, muted content

## Visual Characteristics

### Borders
- **3-4px thick borders** on all interactive elements (buttons, inputs, cards)
- Solid black borders for maximum contrast
- Creates clear visual hierarchy and tactile feel

### Shadows
- **Hard-edged shadows** with offset (e.g., `shadow-[6px_6px_0px_rgba(0,0,0,0.15)]`)
- Positioned at bottom-right for depth without blur
- Reinforces neobrutalism's raw, geometric aesthetic

### Typography
- **Font weight**: Bold and heavy (font-black, font-bold)
- **Approach**: Maximalist, confident, eye-catching
- Uses size contrasts (large headers, smaller body text)

### Corners
- **Zero border-radius** (perfectly squared corners)
- Creates geometric, raw aesthetic
- Emphasizes bold, unapologetic design direction

## Implementation Details

### Design Tokens (globals.css)

```css
--primary: #ff006e         /* Hot Pink */
--secondary: #00d9ff       /* Cyan */
--accent: #ffbe0b          /* Bright Yellow */
--foreground: #1a1a1a      /* Black */
--background: #ffffff      /* White */
--border: #1a1a1a          /* Black */
```

### Component Styling

#### Buttons
```tsx
className="border-3 border-foreground bg-primary text-primary-foreground font-black"
```
- 3px thick borders
- Bold background colors (pink, cyan, yellow)
- Heavy font weight for confidence
- Hover effect: slight offset translation

#### Cards & Containers
```tsx
className="border-4 border-foreground bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.15)]"
```
- 4px thick borders
- Hard-edged shadows for depth
- White background for contrast against colored elements

#### Inputs
```tsx
className="border-3 border-foreground focus:ring-4 focus:ring-offset-2 focus:ring-secondary"
```
- 3px input borders
- High-contrast focus states with cyan rings
- Large focus indicator for accessibility and visual impact

#### Headers
```tsx
className="text-4xl sm:text-6xl font-black text-foreground"
```
- Extra-large sizes with heavy font weights
- Maximum visual impact and hierarchy

## Updated Components

### 1. **Homepage** (`/app/page.tsx`)
- Hero section with bold pink and cyan buttons
- Feature cards with rotating accent colors (pink, cyan, yellow)
- Stats boxes with 4px borders and hard shadows
- CTA section with inverted colors (pink background, white text)
- Bold footer with colored link hovers

### 2. **Navigation** (`/components/navbar.tsx`)
- 4px bottom border
- Category button with cyan background
- White text on colored buttons for contrast
- Logo with bordered pill design

### 3. **Authentication Pages** (`/auth/signup`, `/auth/login`)
- Colored header sections (pink for signup, yellow for login)
- 4px card borders with shadows
- 3px input borders with focus rings
- Bold form labels
- Large submit buttons with bold typography

### 4. **Course Player** (`/components/course-player.tsx`)
- 4px video container borders
- Colored quiz prompts with thick borders
- Lesson items with active state highlighting (pink background)
- Sidebar with bold tab borders

## Design Principles Applied

1. **High Contrast** - Black text on white, vibrant colors ensure readability
2. **Bold & Unapologetic** - No subtle gradients; solid, confident colors
3. **Geometric Precision** - Perfect squares, thick lines, hard shadows
4. **Playful Energy** - Vibrant colors create engaging, non-traditional aesthetic
5. **Raw & Honest** - No rounded corners or soft effects; honest material design
6. **Accessible** - High contrast ratios exceed WCAG standards

## Browser & Device Support

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Fully responsive with mobile-first approach
- Touch-friendly button sizes (minimum 44x44px)
- Optimized shadow rendering across devices

## Future Enhancements

- Micro-interactions: buttons scale/rotate on hover
- Animation loops using pop colors
- Interactive hover states with color transitions
- Custom cursor with color changes

---

**Design Created:** January 2025  
**Platform:** EduFlow EdTech MVP  
**Framework:** Next.js 16 + React + Tailwind CSS v4
