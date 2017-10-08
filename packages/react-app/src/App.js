// @flow
// @jsx css
import css from 'glam';

import React, { Component } from 'react';
import Logo from './logo.svg.js';

// @keyframes App-logo-spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }

class App extends Component<{}> {
  render() {
    return (
      <div css={{ textAlign: 'center' }}>
        <header
          css={{
            backgroundColor: '#222',
            height: '150px',
            padding: '20px',
            color: 'white',
          }}
        >
          {' '}
          <Logo
            css={{
              animation: 'App-logo-spin infinite 20s linear',
              height: '80px',
            }}
            alt="logo"
          />
          <h1 css={{ fontSize: '1.5em' }}>Welcome to React</h1>
        </header>
        <p css={{ fontSize: 'large' }}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
