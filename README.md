Groomy
======

A component-oriented template engine.

Install
-------

Install via npm.

```bash
npm install groomy
```

Usage
-----

```js
const { createRenderer } = require('groomy');

// define component
const hello = `
<template>
  <span>Hello, {{name}}!</span>
  <slot></slot>
</template>
`;

// create render function with the component above
const render = createRenderer({
  components: {
    hello,
  },
});

// render a template
const html = render('<hello name="John">And good-bye....</hello>');
console.log(html.trim());
// <span>Hello, {{name}}!</span>
// And good-bye....
```
