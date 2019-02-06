const { Writer, Context } = require('mustache');

// instanciate Writer to avoid to use global cache.
const moduleOwnWriter = new Writer();

/**
 * compile template
 *
 * @param {string} template - mustache template string
 * @return {Function} eval function to render the template
 */
module.exports = function compile(template) {
  const tokens = moduleOwnWriter.parse(template);
  return attrs => moduleOwnWriter.renderTokens(tokens, new Context(attrs));
};
