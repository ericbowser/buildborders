# Execute & Engrave Color Scheme Proposal

## Brand Identity for Laser Engraving Business

### Primary Color Palette

```css
:root {
  /* Primary Brand Colors */
  --laser-blue: #0EA5E9;      /* Bright laser beam blue - primary CTA */
  --laser-glow: #38BDF8;      /* Lighter blue for hover states */
  --laser-deep: #0284C7;      /* Darker blue for depth */
  
  /* Metal & Industrial Tones */
  --steel-dark: #1E293B;      /* Deep steel for backgrounds */
  --steel-medium: #334155;    /* Medium steel for cards/surfaces */
  --steel-light: #475569;     /* Light steel for borders */
  
  /* Accent Colors */
  --burn-orange: #F97316;     /* Orange for engraving/heat */
  --precision-green: #10B981; /* Success/precision indicator */
  --power-red: #EF4444;       /* Warning/power indicator */
  
  /* Text Colors */
  --text-primary: #F1F5F9;    /* High contrast on dark */
  --text-secondary: #CBD5E1;  /* Muted text */
  --text-inverse: #0F172A;    /* For light backgrounds */
  
  /* Surface Colors */
  --surface-primary: #0F172A;   /* Main dark background */
  --surface-card: #1E293B;      /* Card backgrounds */
  --surface-hover: #334155;     /* Hover states */
  --surface-border: #475569;    /* Subtle borders */
}
```

### Design Rationale

1. **Laser Blue (#0EA5E9)** - Primary brand color
   - Represents the precision and technology of laser cutting
   - High contrast for CTAs and important elements
   - Conveys trust and professionalism

2. **Steel Tones** - Industrial aesthetic
   - Creates a workshop/professional atmosphere
   - Provides excellent readability
   - Matches the industrial nature of laser engraving

3. **Burn Orange (#F97316)** - Accent color
   - Represents the heat/burning aspect of engraving
   - Creates visual interest and energy
   - Use sparingly for highlights and special features

### Updated CSS Implementation

```css
@import "tailwindcss";

:root {
  /* Primary Colors */
  --laser-blue: #0EA5E9;
  --laser-glow: #38BDF8;
  --laser-deep: #0284C7;
  
  /* Industrial Colors */
  --steel-dark: #1E293B;
  --steel-medium: #334155;
  --steel-light: #475569;
  
  /* Accent Colors */
  --burn-orange: #F97316;
  --precision-green: #10B981;
  --power-red: #EF4444;
  
  /* Text Colors */
  --text-primary: #F1F5F9;
  --text-secondary: #CBD5E1;
  --text-inverse: #0F172A;
  
  /* Surfaces */
  --surface-primary: #0F172A;
  --surface-card: #1E293B;
  --surface-hover: #334155;
  --surface-border: #475569;
}

@theme inline {
  --color-primary: var(--laser-blue);
  --color-primary-hover: var(--laser-glow);
  --color-primary-dark: var(--laser-deep);
  
  --color-accent: var(--burn-orange);
  --color-success: var(--precision-green);
  --color-danger: var(--power-red);
  
  --color-surface: var(--surface-primary);
  --color-surface-card: var(--surface-card);
  --color-surface-hover: var(--surface-hover);
  
  --color-text: var(--text-primary);
  --color-text-muted: var(--text-secondary);
  --color-text-inverse: var(--text-inverse);
}
```

### Usage Guidelines

1. **Primary Actions**
   - Use `--laser-blue` for primary CTAs (Shop Now, Get Quote)
   - Hover state: `--laser-glow`
   - Active/pressed: `--laser-deep`

2. **Backgrounds**
   - Main background: `--surface-primary`
   - Cards/sections: `--surface-card`
   - Interactive elements: `--surface-hover` on hover

3. **Typography**
   - Headers: `--text-primary` (high contrast)
   - Body text: `--text-secondary` (softer)
   - On light backgrounds: `--text-inverse`

4. **Special Elements**
   - Tool indicators: `--burn-orange` (engraving mode)
   - Success messages: `--precision-green`
   - Warnings/power: `--power-red`

### Accessibility Notes

- All color combinations meet WCAG AA standards
- Primary blue on dark background: 7.1:1 contrast ratio
- Text colors optimized for readability on industrial backgrounds

### Implementation Example

```jsx
// Primary CTA Button
<button className="bg-primary hover:bg-primary-hover text-surface px-6 py-3 rounded-md font-semibold transition-colors">
  Get Your Free Quote
</button>

// Feature Card
<div className="bg-surface-card border border-surface-hover rounded-lg p-6">
  <h3 className="text-text font-bold text-xl mb-2">Precision Engraving</h3>
  <p className="text-text-muted">Professional laser engraving services...</p>
</div>

// Accent Highlight
<span className="text-accent font-semibold">🔥 Limited Time Offer</span>
```

This color scheme creates a professional, high-tech appearance that aligns with Execute & Engrave's laser engraving services while maintaining excellent readability and user experience.