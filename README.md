# glam

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

`npm install glam`

- super fast + small (<2k gz)
- create real css files
- future facing css : nested selectors, autoprefixing, etc 
- real dynamic props / `@apply`!
- Make Alex Happy (tm)

input -
```jsx
// index.js

import css from 'glam'

let myColor = '#ab67ee'
let radius = '20px'

let myClass = css`
  color: red;
  &:hover {
    font-weight: bold;
    color: ${myColor};
    border-radius: ${radius};
  }
// ...
<div class={myClass}>
  what up homies
</div>
`

```
<details>
  <summary>output</summary><p>
  generated code
```jsx
// index.js

import css from 'glam'

let myColor = '#ab67ee'
let radius = '20px'

let myClass = css('css-1bh6s', [myColor, rad]) 
// generates "css-1bh6s vars-h23psd"
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
```

```css
/* dynamically added */
.vars-h23psd {
  --css-1bh6s-0: #ab67ee;
  --css-1bh6s-1: 20px;
}

```
</p>
</details>


fragments
---

glam lets you define reusable css `fragment`s that can be 
mixed in with `css` and `fragment` definitions

```jsx
import css, {fragment} from 'glam'
let bigNumber = 100
let smallNumber = 6

let bold = fragment` 
  display: flex; 
  font-weight: bold;

` 

let big = fragment` 
  @apply ${bold}; 
  font-size: ${bigNumber} 
`

let small = fragment` 
  font-size: ${smallNumber} 
`

<div className={css` 
  @apply ${props.error ? big : small}; 
  color: red 
`}>
  compose all your classes!
</div>

```

debugging 
---

pass a `name` to generate readable classnames

```jsx
let cls = css`
  name: big;
  font-size: 40px;
`
// big-f8xd3
```

motivation
---

this lib was designed to leverage compile-time to provide great DX, 
and ship only enough js as required for the interactive portions. 


nice things
---

- extract out as much static css as possible, before delegating the dynamic bits to javascript 
- true composition with css vars / `@apply`
- friendly with server side / static rendering 
- backward compatible with older browsers (serve the right bundle!)
- free DCE/async loading/etc via webpack ecosystem 


caveats
---

- interpolated property *values* can't be 'processed', which should be fine?

usage
---

- add `glam/babel` to your babel plugins 
- add `glam/loader` to webpack's css loaders
- ???
- profit


plugin options
---

glam can 'polyfill' for browsers that don't support css vars and / or `@apply`. 
fancy! you could then generate separate bundles targeting different browsers.

- `inline` - bool - default `false`


loading css 
---

add `require('./path/to/file.js.css')` statements as required. 
some options to bundle and serve this css - 

- use a classic webpack combo: `style-loader`/`css-loader`
- use `file-loader` and load it with link tags and/or `@import`
- use `glam/loader`
- (todo) - use `glam/server` to extract 'precise' css from html 

I hope to make this simpler.


bonus - high perf react variant
---

for stuff like animations, you could define your own `css` variant, 
further bringing down runtime cost 

(react@16.alpha-11 and above)

```jsx
function css(cls, vars = []){
  return {
    className: cls,
    style: vars.reduce((o, v, i) => 
      (o[`--${cls}-${i}`] = v, o), {})
  }
}

// ...

<div {...css` font-weight:bold; color: ${props.color}; `}>
  hello!
</div>

```


todo
---
- web components, shadow dom et al
- keyframes, fonts, imports, globals
- ssr
- custom postcss pipeline
- source maps?
- typed om?
- SC api?
- unload styles?
- hot loading support 
- test inheritance chains 

previous work
---

- [css-literal-loader](https://github.com/4Catalyzer/css-literal-loader)


thanks
---

- to [@gregtatum](https://github.com/gregtatum) for the `glam` package name!

