# Character Animator - Usage Guide 🎮

## Files Created

### 1. **CharacterAnimator.tsx** (React Component)
Main reusable component with built-in animations.

```tsx
import CharacterAnimator from "@/components/CharacterAnimator";

export default function Page() {
  return (
    <CharacterAnimator 
      animation="idle"  // "idle" | "walk" | "float"
      scale={8}         // Scale factor (default: 8)
    />
  );
}
```

### 2. **sprite-sheet.html** (Visualization)
Open in browser to see all animation frames.
- Shows 4 idle frames
- Live animation demos
- Adjust scale and preview different animations

**How to export as PNG:**
1. Open `sprite-sheet.html` in browser
2. Right-click → Save as → Select PNG format
3. Or use browser DevTools: 
   - Press F12
   - Go to Console
   - Right-click on element → Screenshot

### 3. **character-animations.css** (Standalone CSS)
Use without React component for static HTML.

```html
<link rel="stylesheet" href="/character-animations.css">

<!-- Idle animation -->
<div class="character-sprite idle"></div>

<!-- Walk animation -->
<div class="character-sprite walk"></div>

<!-- Float animation -->
<div class="character-sprite float"></div>
```

---

## Usage Examples

### Example 1: Idle Character on Login Page
```tsx
// app/page.tsx
import CharacterAnimator from "@/components/CharacterAnimator";

export default function LoginPage() {
  return (
    <div className="login-container">
      <CharacterAnimator animation="idle" scale={8} />
      {/* Login form... */}
    </div>
  );
}
```

### Example 2: Walking Character
```tsx
<CharacterAnimator animation="walk" scale={6} />
```

### Example 3: Floating/Celebration Character
```tsx
<CharacterAnimator animation="float" scale={8} />
```

---

## Animation Frames

### Frame Structure (16×24px)
- **Frame 1 (Idle 1)**: Default pose
- **Frame 2 (Idle 2)**: Left arm raised
- **Frame 3 (Idle 3)**: Right arm raised
- **Frame 4 (Idle 4)**: Both arms raised

### Animation Loops
- **Idle**: [0, 1, 2, 3, 2, 1] - Smooth breathing effect
- **Walk**: [0, 1, 2, 1] - Walking cycle
- **Float**: [0, 0, 1, 1] - Gentle floating

---

## Customization

### Adjust Animation Speed
Edit `CharacterAnimator.tsx`:
```tsx
const speed = animation === "float" ? 500 : // Slower
              animation === "walk" ? 150 : // Faster
              300; // Default
```

### Change Colors
Edit color variables in component:
```tsx
.skin { background: #f2c7a5; }      // Skin tone
.hat1 { background: #111c3d; }      // Hat color
.robe2 { background: #1d3d78; }     // Robe color
.gold { background: #e0b84e; }      // Tassel/buttons
```

### Add New Animations
Add to `CharacterAnimator.tsx`:
```tsx
const framePerAnimation = {
  idle: [0, 1, 2, 3, 2, 1],
  walk: [0, 1, 2, 1],
  float: [0, 0, 1, 1],
  dance: [0, 1, 2, 3], // New!
};
```

---

## Export to PNG Sprite Sheet

### Manual (Browser)
1. Open `sprite-sheet.html`
2. Press F12 (DevTools)
3. Elements tab → Right-click animation container → Screenshot
4. Save as PNG

### Programmatic (Node.js)
Use `sharp` library:
```bash
npm install sharp
```

```js
const sharp = require('sharp');

// Create sprite sheet programmatically
sharp('character-frame-0.png')
  .extend({ right: 48, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile('sprite-sheet.png');
```

---

## Dimensions

- **Single frame**: 16px × 24px
- **Sprite sheet (4 frames)**: 64px × 24px (idle row)
- **Full sprite sheet (3 animations)**: 64px × 72px

### Display Sizes (with scale=8)
- Base: 16×24px
- Scaled: 128×192px

---

## Browser Support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Uses CSS Grid, Flexbox, and CSS animations (widely supported).

---

## Tips & Tricks

1. **Loop Count**: Adjust frame array to control loop smoothness
2. **Performance**: Use `will-change: transform` for animations
3. **Responsive**: Adjust `scale` prop based on screen size
4. **Mobile**: Consider using lower scale (4-6) on mobile devices

---

## Next Steps

1. ✅ Test `CharacterAnimator` component on login page
2. ✅ Export sprite sheet as PNG
3. ✅ Customize colors/scale for your design
4. ✅ Add more animations as needed
5. ✅ Use CSS animations for performance optimization

---

**Made with ❤️ for Graduation Invitation OS**
