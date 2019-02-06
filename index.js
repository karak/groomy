const HtmlTransformer = require('./html-transformer');

/**
 * create render function
 * @param {Object} options - rendering options
 * @param {Object=} options.components - map from selector to component
 */
function createRenderer(options) {
  const { components } = options;
  const t = new HtmlTransformer();

  if (components) {
    Object.entries(components).forEach(([selector, component]) => {
      t.registerElement(selector, component);
    });
  }

  /**
   * render template
   * @param {string} template - template string
   */
  return template => t.render(template);
}

module.exports = {
  createRenderer,
};
