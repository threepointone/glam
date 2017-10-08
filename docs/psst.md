glam
---

“It's like giving a glass of ice water to somebody in hell"

`yarn add glam` or `npm install glam`

```jsx
// copy paste this
/* @jsx ele */
import ele from 'glam'

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



object format
---

- `key: value`
- `key : [...fallbacks]`
- `<selector> : {...}`
- `@media <query>: {...}`
- `@supports: {...}`
- nest it however you want


motivation
---

I made it for me. You might like it.

- jsx
- fast, small
- future facing
- there's no api
- great for prototyping
- consume design systems
- objects everywhere
- compose with arrays
- easily pull out and replace
- no more global caches!

tradeoffs
---

- memory - WeakMap cache, insertion Set per context
- runtime  < 7k
- learning curve

how is it different
---

- streaming ssr support
- iframes
- wc (via skate?)
- scoped-sheets
- safe

todo
---
- ~ - flow typed
- deduped
- themable
- safe (xss)
- debuggable
- critical
- progressive

- typescript?
- reason?
- postcss?
- iframes/wc
- react-native? vr?
- static extraction?
- glamor shim? (return stringable arrays)
- unmount styles?
- `global`
- `fonts`
- `animations`
- `scoped`?
- 'virtual'?
- styled-system support?
- plugins (render/generate)?
- houdini?
- reset.css
