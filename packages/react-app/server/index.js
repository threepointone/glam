// @flow
import React from 'react';
const express = require('express');
import { renderToNodeStream } from 'react-dom/server';
import App from '../src/App';
const app = express();

app.get('/', (req, res) => {
  // res.send('hello world');

  //open tags
  res.write(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>streaming css example</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
        </style>
      </head>
      <body>
        <div id='root'>`);
  const stream = renderToNodeStream(<App />);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write(
      '</div><script src="/static/js/main.a0924634.js"></script></body></html>',
    );
    res.end();
  });
});

app.use(express.static('./build'));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
