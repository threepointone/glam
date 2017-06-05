import React from 'react'
export function styled (Tag, cls, fns, content) {
  return class Target extends React.Component {
    static displayName = cls
    render () {
      // return <Tag classname={cx()} {...this.props}/>
    }
  }
}

export function createElement (tag, props, children) {}
