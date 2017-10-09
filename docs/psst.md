glam
---

[work in progress]

“It's like giving a glass of ice water to somebody in hell"

`yarn add glam` or `npm install glam`

```jsx
// copy paste this at the top of your file
/* @jsx glam */
import glam from 'glam'

// and then write css as inline objects

<div css={{
  color: 'red',
  ':hover': {
    color: 'blue'
  }
}}>
  hello world!
</div>
```


motivation
---

I made it for me. You might like it. It's the core experience of glamor, trimmed down and optimised for react.

- fast, small
- great for prototyping / design systems
- objects everywhere
- compose with arrays
- 'just works' with react v16
- easy to migrate to/from another system


object format
---

- `key: value`
- `key : [...fallbacks]`
- `<selector> : {...}`
- `@media <query>: {...}`
- `@supports: {...}`
- (todo) `@keyframes: {...}`
- (todo) `@font-face: {...}`
- nest it however you want


composition
---

- objects everywhere
- nested selectors
- arrays to join efficiently
- whatever pattern you want on top - Bem, itcss, oocss, whatever


debugging / tools / dx
---

[todo]


tradeoffs
---

- memory
- runtime < 8k
- learning curve


how does it work?
---

[todo]


how is it different
---

- typed
- streaming ssr support
- (todo) iframes
- (todo) wc (via skate?)
- (todo) safe


server rendering
---

[todo]



[wip]
---

- `global`
- react-native? vr?
- static extraction?
- `scoped`?
- 'virtual'?
- parser/generator plugins?
- houdini?
- reset.css
