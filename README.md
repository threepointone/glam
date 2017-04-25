[experimental!]

glam 
---

- super fast + small (<2k)
- extracts css out into regular css files 
- use with css ecosystem: postcss, sass, etc 
- Make Alex Happy (tm)


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



todo
---
- web components, shadow dom et al
- DCE
- ssr
- source maps?
- typed om?
- SC api?
- unload styles?


no
---

- `@apply` :( composition will be a *little* harder
- |||ly, non-value interpolations
- nondeterministic resolution
- not "great" browser support (read - no ie, opera mini, uc)
