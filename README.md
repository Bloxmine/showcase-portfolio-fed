# Portfolio Website - heind_

A modern, interactive portfolio website featuring stunning visual effects, chromatic aberration, and smooth animations built with vanilla JavaScript and GSAP.

![Portfolio Preview](images/me.jpeg)

## 🌟 Features

- **Chromatic Aberration Effects** - Dynamic RGB color separation that responds to mouse movement
- **Smooth Scroll Animations** - GSAP-powered section reveals with stamp and shake effects
- **Flying Text Animations** - Scroll-triggered text animations in the animated section
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Touch Device Support** - Adaptive animations for touch-enabled devices
- **Project Showcase** - Interactive carousel with list/thumbnail view toggle
- **SVG Filters** - Custom glitch effects applied to typography
- **Torn Paper Aesthetic** - Unique clip-path effects for visual interest

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties, animations, and clip-paths
- **JavaScript (ES6+)** - Modern vanilla JavaScript
- **GSAP** - GreenSock Animation Platform for smooth animations
- **ScrollTrigger** - GSAP plugin for scroll-based animations
- **Custom Fonts** - Intranet, MisterFirley, and Oswald typefaces

## 📁 Project Structure

```
portfoliotesting/
├── css/
│   ├── main.css              # Main stylesheet (organized by sections)
│   └── main.css.backup       # Backup of previous version
├── fonts/
│   ├── IntraNet.otf
│   ├── MisterFirley.otf
│   └── Oswald-Regular.ttf
├── images/
│   ├── dustoverlay.jpg       # Texture overlay
│   ├── me.jpeg               # Profile photo
│   ├── carousel/             # Project thumbnails
│   └── icons/                # Social media icons
├── js/
│   ├── main.js               # Main JavaScript (organized & documented)
│   ├── main.js.backup        # Backup of previous version
│   └── projects-loader.js    # Dynamic project loading
├── json/
│   └── projects/             # Project data files
├── letters/                  # Letter images for animations
├── index.html                # Main HTML file
└── README.md                 # This file
```

## 🎨 Key Sections

1. **Landing** - Animated name display with diagonal flying text background
2. **About** - Personal introduction and social links
3. **Projects** - Interactive project carousel with filtering options
4. **Tech Stack** - Technologies and tools showcase
5. **Animated** - Scroll-triggered flying text experience
6. **Contact** - Get in touch section

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bloxmine/showcase-portfolio-fed.git
cd showcase-portfolio-fed
```

2. Open the project:
   - **Option 1**: Open `index.html` directly in your browser
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     
     # Using VS Code Live Server extension
     # Right-click index.html → "Open with Live Server"
     ```

3. Navigate to `http://localhost:8000` (or appropriate port)

## 🎯 Configuration

### Customizing Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --primary-bg: #fff;
    --section-bg: #181818;
    --cyan: #09fdfd;
    --magenta: #fc0101;
    --yellow: #E3AA00;
    /* ... more variables */
}
```

### Adjusting Animations

Edit the CONFIG object in `js/main.js`:

```javascript
const CONFIG = {
    chromaticAberration: {
        maxOffset: 5,  // Adjust intensity
    },
    rotation: {
        max: 2,  // Max rotation degrees
    },
    animation: {
        duration: 0.2,  // Animation speed
    }
};
```

### Adding Projects

1. Create a new JSON file in `json/projects/`:
```json
{
    "title": "Project Name",
    "description": "Project description",
    "image": "images/carousel/project.jpg",
    "links": {
        "demo": "https://demo-link.com",
        "github": "https://github.com/user/repo"
    }
}
```

2. The project will be automatically loaded by `projects-loader.js`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

### Chromatic Aberration
Mouse movement creates a dynamic RGB color separation effect using SVG filters, giving a glitchy, retro-futuristic aesthetic.

### Torn Paper Effect
Custom CSS clip-paths create irregular, torn paper edges on section containers for a unique visual style.

### Stamp Animation
Desktop users see sections "stamp" onto the page with a satisfying bounce and shake effect powered by GSAP.

### Touch Optimization
Touch devices receive simplified animations for better performance while maintaining visual appeal.

## 🔧 Development

### Code Organization

The project follows a clean, modular structure:

- **CSS**: Organized into logical sections with comments
- **JavaScript**: Functions grouped by purpose with JSDoc documentation
- **Assets**: Properly organized in dedicated folders

### Making Changes

1. **CSS changes**: Edit `css/main.css` - organized by sections
2. **JS changes**: Edit `js/main.js` - well-documented functions
3. **Content**: Update `index.html` or project JSON files
4. **Backups**: Original files saved as `.backup`

## 📝 License

This project is open source and available for personal and commercial use.

## 👤 Author

**heind_**

- GitHub: [@Bloxmine](https://github.com/Bloxmine)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- GSAP by GreenSock for amazing animation capabilities
- Chromatic aberration effect inspired by [CodePen](https://codepen.io/fand/pen/EgGwjg)
- Custom fonts: Intranet, MisterFirley, Oswald
- Google Fonts: Montserrat, Inter

## 🐛 Known Issues

- SVG filters may have performance impact on older devices
- Scroll snap behavior varies slightly across browsers
- Some animations disabled on touch devices for performance

## 🔮 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Add more project filtering options
- [ ] Implement project detail modal
- [ ] Add contact form functionality
- [ ] Performance optimizations for mobile
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)

---

**Built with ❤️ and lots of coffee ☕**
