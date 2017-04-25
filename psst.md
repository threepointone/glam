glam - spec doc
---

- use the platform (tm)
- designed for low power devices
- extracts css out into regular css files 
- include 'precise' css based on usage 
- super fast + small (<2k)
- nested selectors, future facing syntax... the works
- editor support - linting, syntax highlighting, etc 
- Make Alex Happy (tm)
- DCE unused styles 
- ssr friendly
- source maps?
- typed om?
- SC api?
- unload styles?


no
---

- @apply :( composition will be a *little* harder
- |||ly, non-value interpolations
- not "great" browser support



input -
```jsx

let myColor = '#ab67ee'
let rad = '20px'

let myclass = css`
  color: red;
  &:hover {
    font-weight: bold;
    color: ${myColor};
    border-radius: ${rad};
  }
`
```

output -
```jsx
import css from 'glam'

let myColor = '#ab67ee'
let rad = '20px'

let myClass = css('x-1bh6s', [myColor, rad]} }) 
```

```css

.x-1bh6s {
  color: red
}
.x-1bh6s:hover {
  font-weight: bold;
  color: var(--x-1bh6s-0);
  border-radius: var(--x-1bh6s-1);
}

// dynamically added
.y-h23psd {
  --x-1bh6s-0: #ab67ee;
  --x-1bh6s-1: 20px;
}

```

usage
---

- add `glam/babel` to your babel plugins 
- use style-loader/css-loader/postcss/whatever as you normally would
- ???
- profit
