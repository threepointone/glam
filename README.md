[experimental!]

glam 
---

`npm install @threepointone/glam`

- super fast + small (<2k gz)
- extracts css out into regular css files 
- optional readable classnames (eg. `name: myButton;`)
- use with css ecosystem: postcss, sass, etc ([example webpack config](https://github.com/threepointone/glam/blob/master/webpack.config.js))
- parallel load / append 
- Make Alex Happy (tm)


input -
```jsx
// index.js

import css from '@threepointone/glam'

let myColor = '#ab67ee'
let radius = '20px'

let myclass = css`
  color: red;
  &:hover {
    font-weight: bold;
    color: ${myColor};
    border-radius: ${radius};
  }
`

```

output -
```jsx
// index.js

import('./index.js.css') 
// defaults to async load
// sync load with explicit require('./index.js.css')

import css from '@threepointone/glam'

let myColor = '#ab67ee'
let radius = '20px'

let myClass = css('css-1bh6s', [myColor, rad]) 
```

```css
/* index.js.css */

.css-1bh6s {
  color: red
}
.css-1bh6s:hover {
  font-weight: bold;
  color: var(--css-1bh6s-0);
  border-radius: var(--css-1bh6s-1);
}

/* dynamically added */
.vars-h23psd {
  --css-1bh6s-0: #ab67ee;
  --css-1bh6s-1: 20px;
}

```

zero cost react variant
---

you could define your own variant, bringing down runtime cost further

(react 16.alpha-11 and above)

```jsx
function css(cls, vars){
  return {
    className: cls,
    style: vars ? vars.reduce((o, va, i) => 
      (o[`--${cls}-${i}`] = vars[i], o), {}) : {}
  }
}

// ...

<div {...css` font-weight:bold; color: ${props.color}; `}>
  hello!
</div>

```


usage
---

- add `@threepointone/glam/babel` to your babel plugins 
- use `style-loader` + `css-loader` as usual, or `@threepointone/glam/loader`
- add postcss, sass, etc custom loaders
- ???
- profit



todo
---
- web components, shadow dom et al
- keyframes 
- emit css files with webpack?
- ssr
- source maps?
- typed om?
- SC api?
- unload styles?
- work with extract-text-plugin

no
---

- fontfaces
- `@apply` :( composition will be a *little* harder
- |||ly, non-value interpolations
- nondeterministic resolution
- not "great" browser support (read - no ie, opera mini, uc)
