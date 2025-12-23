# Accessibility Features

This site implements Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

## Features Implemented

### 1. **Skip Navigation Link**
- Keyboard users can press Tab on any page to reveal a "Skip to main content" link
- Allows bypassing repetitive navigation
- Located at: `components/accessibility/SkipLink.vue`

### 2. **Semantic HTML & ARIA**
- Proper use of semantic HTML5 elements (`<nav>`, `<main>`, `<header>`, `<footer>`)
- ARIA roles, labels, and states where needed
- Proper heading hierarchy (h1 → h2 → h3)

### 3. **Keyboard Navigation**
- All interactive elements accessible via keyboard
- Visible focus indicators (orange outline)
- Accordion component supports:
  - Arrow Up/Down to move between accordion items
  - Home/End to jump to first/last item
  - Space/Enter to toggle accordion panels

### 4. **Screen Reader Support**
- `.sr-only` class for screen-reader-only text
- Descriptive ARIA labels on all controls
- Proper announcement of expanded/collapsed states
- "opens in new window" announcements for external links

### 5. **Focus Management**
- High-contrast focus indicators (2px solid #ff5722)
- Skip link allows focus to jump to main content
- Mobile menu toggle updates aria-expanded state

### 6. **Navigation Accessibility**
- Desktop navigation uses proper menubar/menuitem roles
- Mobile navigation includes aria-expanded states
- Dropdown menus announce expanded/collapsed states
- Keyboard accessible dropdowns

### 7. **Accordion Accessibility**
- Button-based controls (not links)
- Proper aria-expanded attributes
- Region roles with descriptive labels
- Visual and screen reader indicators for state

### 8. **Tab Interfaces**
- Tab/tabpanel pattern in About page
- aria-selected states
- Proper keyboard navigation

## Testing Recommendations

### Keyboard Navigation Test
1. Press `Tab` - Skip link should appear
2. Continue tabbing through all interactive elements
3. Verify all elements are reachable
4. Verify focus indicators are visible

### Screen Reader Test
Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Automated Testing
```bash
# Install accessibility testing tools
npm install -D @nuxtjs/web-vitals axe-core

# Run Lighthouse accessibility audit
npx lighthouse http://localhost:3000 --only-categories=accessibility
```

## Color Contrast

All text meets WCAG AA standards:
- Primary text: Black on White (21:1)
- DMD Orange (#ff5722) on white: 3.3:1 (large text only)
- PSU Blue (#1e407c) on white: 8.3:1 ✓

## Image Accessibility

All images should include:
- Descriptive `alt` attributes
- Empty `alt=""` for decorative images
- Long descriptions for complex images

## Future Enhancements

- [ ] Add live regions for dynamic content updates
- [ ] Implement reduced motion preferences
- [ ] Add high contrast mode toggle
- [ ] Implement focus trap for modal dialogs
- [ ] Add breadcrumb navigation
- [ ] Add print stylesheet

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
