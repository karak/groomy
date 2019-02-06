const { createRenderer } = require('../');

const hello = `
<template>
  <span>Hello, {{name}}!</span>
</template>
`;

const title = `
<template>
  <h1><slot></slot></h1>
</template>
`;

describe('renderer', () => {
  let render;

  beforeEach(() => {
    render = createRenderer({
      components: {
        hello,
        title,
      },
    });
  });

  it('should render <hello> with name', () => {
    const html = render('<hello name="John"></hello>');
    expect(html.trim()).toBe('<span>Hello, John!</span>');
  });

  it('should replace <slot>', () => {
    const html = render('<title>New <span>Testament</span></title>');
    expect(html.trim()).toBe('<h1>New <span>Testament</span></h1>');
  });
});
