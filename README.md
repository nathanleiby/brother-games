# Motion for React Demo

A comprehensive demonstration of [Motion for React](https://motion.dev/docs/react) - the powerful animation library that's simple to start and fun to master.

## 🚀 Features Demonstrated

This demo showcases Motion's key animation capabilities:

### ✨ Enter Animations

- **Spring Animation**: Smooth scale and rotation with spring physics
- **Slide In**: Elements slide in from different directions
- **Fade Up**: Elements fade in while moving upward

### 🖱️ Gesture Animations

- **Hover Effects**: Scale, color changes, and rotation on hover
- **Tap Interactions**: Responsive feedback on button presses
- **Smooth Transitions**: Hardware-accelerated animations

### 📜 Scroll Animations

- **Scroll-Triggered**: Elements animate when entering the viewport
- **Staggered Animations**: Sequential animations with delays
- **Directional Entries**: Elements slide in from left and right

### 🎭 Exit Animations

- **AnimatePresence**: Smooth exit animations when elements are removed
- **Scale and Rotate**: Creative exit effects
- **Toggle Controls**: Interactive show/hide functionality

### 📐 Layout Animations

- **Automatic Layout**: Smooth transitions when layout changes
- **Add/Remove Items**: Dynamic list with animated additions/removals
- **Fluid Transitions**: Elements smoothly reposition

### 🔄 Motion Values

- **Continuous Animations**: Infinite loops with multiple properties
- **Color Transitions**: Smooth color changes
- **Complex Sequences**: Multiple animated properties

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Motion** - Animation library (formerly Framer Motion)
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients and effects

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd brother-games
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎨 Design Features

- **Modern UI**: Glassmorphism effects with backdrop blur
- **Responsive Design**: Works perfectly on all screen sizes
- **Beautiful Gradients**: Eye-catching color schemes
- **Smooth Interactions**: 60fps animations with hardware acceleration
- **Accessibility**: Respects `prefers-reduced-motion` settings

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 Motion Concepts Covered

### Basic Usage

```jsx
import { motion } from "motion/react";

<motion.div animate={{ scale: 1.2 }} />;
```

### Gestures

```jsx
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
```

### Scroll Animations

```jsx
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
```

### Exit Animations

```jsx
<AnimatePresence>
  {show && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

### Layout Animations

```jsx
<motion.div layout>{/* Content that changes layout */}</motion.div>
```

## 🎯 Key Benefits of Motion

1. **Hybrid Engine**: Combines hardware-accelerated browser animations with JavaScript flexibility
2. **Simple API**: Intuitive props like `animate`, `whileHover`, `whileInView`
3. **Performance**: Optimized for 60fps animations
4. **Accessibility**: Built-in support for reduced motion preferences
5. **TypeScript**: Full TypeScript support
6. **Bundle Size**: Tree-shakeable and lightweight

## 🔗 Resources

- [Motion Documentation](https://motion.dev/docs/react)
- [Motion Examples](https://motion.dev/examples)
- [Motion GitHub](https://github.com/motiondivision/motion)
- [React Documentation](https://react.dev)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Motion for React
