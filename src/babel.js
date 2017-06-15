import parseCSS from './parseCSS'
import touch from 'touch'
import fs from 'fs'
import hashArray from './hash'

function getName (str) {
  let regex = /name\s*:\s*([A-Za-z0-9\-_]+)\s*/gm
  let match = regex.exec(str)
  if (match) {
    return match[1]
  }
}

function getArrayValuesFromRules (rules, t) {
  return rules.map(rule => {
    const re = /xxx(\S)xxx/gm
    let varMatch
    let matches = []
    while ((varMatch = re.exec(rule)) !== null) {
      matches.push({
        value: varMatch[0],
        p1: varMatch[1],
        index: varMatch.index
      })
    }

    let cursor = 0
    const [quasis, expressions] = matches.reduce(
      (accum, {value, p1, index}, i) => {
        const [quasis, expressions] = accum
        const preMatch = rule.substring(cursor, index)
        cursor = cursor + preMatch.length + value.length
        if (preMatch) {
          quasis.push(t.templateElement({raw: preMatch, cooked: preMatch}))
        }

        expressions.push(t.identifier(`x${p1}`))

        if (i === matches.length - 1 && cursor <= rule.length) {
          const postMatch = rule.substring(cursor)

          quasis.push(
            t.templateElement(
              {
                raw: postMatch,
                cooked: postMatch
              },
              true
            )
          )
        }
        return accum
      },
      [[], []]
    )

    if (!matches.length) {
      return t.templateLiteral(
        [t.templateElement({raw: rule, cooked: rule}, true)],
        []
      )
    }

    return t.templateLiteral(quasis, expressions)
  })
}

function parser (path) {
  let code = path.hub.file.code
  let strs = path.node.quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(strs.join('xxx')) || 'css'

  let stubs = path.node.quasi.expressions.map(x =>
    code.substring(x.start, x.end)
  )

  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== stubs.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--${name}-${hash}-${i}`)
        } else arr.push(`var(--${name}-${hash}-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()
  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  let parsed = rules.join('\n')

  return { hash, parsed, stubs, name }
}

function inline (path) {
  let code = path.hub.file.code
  let strs = path.node.quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(strs.join('xxx')) || 'css'

  let stubs = path.node.quasi.expressions.map(x =>
    code.substring(x.start, x.end)
  )

  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== stubs.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--${name}-${hash}-${i}`)
        } else arr.push(`var(--${name}-${hash}-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()

  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  rules = rules.map(rule =>
    rule.replace(
      /@apply\s+--[A-Za-z0-9-_]+-([0-9]+)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
  rules = rules.map(rule =>
    rule.replace(
      /var\(--[A-Za-z0-9-_]+-([0-9]+)\)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )

  return { hash, stubs, name, rules }
}

function fragment (path) {
  let code = path.hub.file.code
  let strs = path.node.quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(strs.join('xxx')) || 'frag'

  let stubs = path.node.quasi.expressions.map(x =>
    code.substring(x.start, x.end)
  )

  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== stubs.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--${name}-${hash}-${i}`)
        } else {
          arr.push(`var(--${name}-${hash}-${i})`)
        }
      }
      return arr
    }, [])
    .join('')
    .trim()
  let rules = parseCSS(`.${name}-${hash} { --${name}-${hash}: { ${src} }; }`, {
    nested: false
  })
  let parsed = rules.join('\n')

  return { hash, parsed, stubs, name }
}

function fragmentinline (path) {
  let code = path.hub.file.code
  let strs = path.node.quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(strs.join('xxx')) || 'frag'

  let stubs = path.node.quasi.expressions.map(x =>
    code.substring(x.start, x.end)
  )

  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== stubs.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--${name}-${hash}-${i}`)
        } else arr.push(`var(--${name}-${hash}-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()

  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  rules = rules.map(rule =>
    rule.replace(
      /@apply\s+--[A-Za-z0-9-_]+-([0-9]+)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
  rules = rules.map(rule =>
    rule.replace(
      /var\(--[A-Za-z0-9-_]+-([0-9]+)\)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )

  return { hash, stubs, name, rules }
}

module.exports = function ({ types: t }) {
  return {
    name: 'glam', // not required
    visitor: {
      Program: {
        enter (path, state) {
          state.injected = false
          let inserted = {}
          state.toInsert = []
          // let file = path.hub.file.opts.filename
          state.inject = function () {
            if (!state.injected) {
              state.injected = true

              state.toInsert.push('/* do not edit this file */')

              // let src = (state.opts.sync && !state.opts.inline) ?
              //   `import './${require('path').basename(file) + '.css'}';` :
              //   `import('./${require('path').basename(file) + '.css'}');`
              // if(!state.opts.inline){
              //   let impNode = babylon.parse(src, {sourceType: 'module', plugins: ['*']}).program.body[0]
              //   path.node.body.unshift(impNode)
              // }
            }
          }
          state.insert = function (hash, css) {
            if (!inserted[hash]) {
              inserted[hash] = true
              state.toInsert.push(css)
            }
          }
        },
        exit (path, state) {
          let file = path.hub.file.opts.filename

          let toWrite = state.toInsert.join('\n').trim()
          if (
            !state.opts.inline &&
            state.injected &&
            (fs.existsSync(file + '.css')
              ? fs.readFileSync(file + '.css', 'utf8') !== toWrite
              : true)
          ) {
            if (!fs.existsSync(file + '.css')) {
              touch.sync(file + '.css')
            }

            fs.writeFileSync(file + '.css', toWrite)
          }
        }
      },
      TaggedTemplateExpression (path, state) {
        let { tag } = path.node

        if (tag.name === 'css') {
          state.inject()

          if (state.opts.inline) {
            // in:
            // ['.css-r1aqtk { margin: 12px;\n       color: xxx0xxx;\n       height: xxx1xxx; }']
            //
            // out:
            // css("css-r1aqtk", [colorVar, heightVar], function inlineCss(x0, x1) {
            //   return [`.css-r1aqtk {
            //     margin: 12px;
            //     color: ${x0};
            //     height: ${x1}; }`];
            // });
            let { hash, stubs, rules, name } = inline(path)

            let arrayValues = getArrayValuesFromRules(rules, t)

            const inlineExpr = t.functionExpression(
              t.identifier('inlineCss'),
              stubs.map((x, i) => t.identifier(`x${i}`)),
              t.blockStatement([
                t.returnStatement(t.arrayExpression(arrayValues))
              ])
            )

            path.replaceWith(
              t.callExpression(t.identifier('css'), [
                t.stringLiteral(`${name}-${hash}`),
                t.arrayExpression(path.node.quasi.expressions),
                inlineExpr
              ])
            )
          } else {
            let { hash, parsed, name } = parser(path)
            state.insert(hash, parsed)
            path.replaceWith(
              t.callExpression(t.identifier('css'), [
                t.stringLiteral(`${name}-${hash}`),
                t.arrayExpression(path.node.quasi.expressions)
              ])
            )
          }
        }

        if (tag.name === 'fragment') {
          state.inject()
          // fragment('frag-[hash]', vars, () => [``])
          if (state.opts.inline) {
            let { hash, stubs, name, rules } = fragmentinline(path)
            path.replaceWith(
              t.callExpression(t.identifier('fragment'), [
                t.stringLiteral(`${name}-${hash}`),
                t.arrayExpression(stubs.map(i => t.identifier(i))),
                t.arrowFunctionExpression(
                  stubs.map((x, i) => t.identifier(`x${i}`)),
                  t.arrayExpression(getArrayValuesFromRules(rules, t))
                )
              ])
            )
          } else {
            let { hash, parsed, stubs, name } = fragment(path, { name: 'frag' })
            state.insert(hash, parsed)
            let cls = `${name}-${hash}`
            if (stubs.length > 0) {
              path.replaceWith(
                t.callExpression(t.identifier('fragment'), [
                  t.stringLiteral(cls),
                  t.arrayExpression(stubs.map((i) => t.identifier(i)))
                ])
              )
            } else {
              path.replaceWith(
                t.callExpression(t.identifier('fragment'), [
                  t.stringLiteral(cls)
                ])
              )
            }
          }
        }
      }
    }
  }
}
