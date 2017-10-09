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
- easy to migrate to/from another system


object format
---

- `key: value`
- `key : [...fallbacks]`
- `<selector> : {...}`
- `@media <query>: {...}`
- `@supports: {...}`
- nest it however you want
- (todo) `@keyframes: {...}`
- (todo) `@font-face: {...}`


composition
---

- objects everywhere
- nested selectors
- arrays to join efficiently
- whatever pattern you want on top - bem, itcss, oocss, sc, jsxstyle, whatever


debugging / tools / dx
---

[todo]


tradeoffs
---

- memory - glam maintains a hierarchical WeakMap cache for the parser, and a Set of inserted ids.  
- runtime - about 8k gz
- added bundle size of having your styles as objects
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

glam should 'just work' with react v16, streaming and all.

[todo] - when hydrating on the client side, use `glam/hydrate`.

[todo - v15 shim]



[maybe?]
---

- `global`
- react-native/ vr
- static extraction
- `scoped`
- 'virtual'
- parser/generator plugins
- houdini
- reset.css
