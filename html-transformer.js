const cheerio = require('cheerio');
const compile = require('./compile');

const ROOT_TAG_NAME = 'template';

const DEFAULT_PARSER_OPTIONS = {
  xmlMode: true,
  decodeEntities: false,
};

/**
 * @class Node
 * @property {string} type
 * @property {string} name
 * @property {Array<Node>} children
 */

/**
 * Ensure root node is single <template>.
 *
 * @param {Array<Node>} nodes
 * @returns {Array<Node>|null} contents of the root
 */
function ensureRootNode(nodes) {
  if (nodes.length !== 1 || (nodes[0].type === 'tag' && nodes[0].name !== ROOT_TAG_NAME)) {
    return null;
  }
  return nodes[0].children;
}

/**
 * Entry class to transform HTML template.
 */
class HtmlTransformer {
  /**
   * constructor
   * @param {Object=} parserOptions
   */
  constructor(parserOptions) {
    this.parserOptions = Object.assign({}, DEFAULT_PARSER_OPTIONS, parserOptions || {});
    this.components = [];
  }

  /**
   * register custom element
   * @param {string} selector
   * @param {string} template
   * @return {undefined}
   */
  registerElement(selector, template) {
    this.components.push([selector, compile(template.trim())]);
  }

  /**
   * render template
   * @param {string} template template string
   */
  render(template) {
    const $ = cheerio.load(template, this.parserOptions);
    let touched;
    do {
      touched = false;
      for (let i = 0; i < this.components.length; i += 1) {
        const [selector, renderComponent] = this.components[i];
        $(selector).each(function replaceNode() {
          const $el = $(this);
          const attrs = $el.attr();
          const contents = $el.contents();

          const rootNodes = $.parseHTML(renderComponent(attrs));
          const newContents = ensureRootNode(rootNodes);
          if (newContents === null) {
            throw new Error('root <template> node must be one!');
          }

          // replace slots
          $('slot', newContents).replaceWith(contents);

          // replace target
          $el.replaceWith(newContents);
        });
      }
    } while (touched);
    return $.html();
  }
}

module.exports = HtmlTransformer;
