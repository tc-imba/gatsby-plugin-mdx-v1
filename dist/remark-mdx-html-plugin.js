"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remarkMdxHtmlPlugin = void 0;

var _cacheHelpers = require("./cache-helpers");

// This plugin replaces html nodes with JSX divs that render given HTML via dangerouslySetInnerHTML
// We have to find out if this is really a good idea, but its processing footprint is very low
// compared to other solutions that would traverse the given HTML.
const remarkMdxHtmlPlugin = () => async function transformer(markdownAST) {
  const {
    visit
  } = await (0, _cacheHelpers.cachedImport)(`unist-util-visit`);
  visit(markdownAST, node => {
    if (![`html`, `raw`].includes(node.type)) {
      return;
    }

    node.type = `mdxJsxFlowElement`;
    node.name = `div`;
    node.attributes = [{
      type: `mdxJsxAttribute`,
      name: `dangerouslySetInnerHTML`,
      value: {
        type: `mdxJsxAttributeValueExpression`,
        data: {
          estree: {
            type: `Program`,
            body: [{
              type: `ExpressionStatement`,
              expression: {
                type: `ObjectExpression`,
                properties: [{
                  type: `Property`,
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: `Identifier`,
                    name: `__html`
                  },
                  value: {
                    type: `Literal`,
                    value: node.value
                  },
                  kind: `init`
                }]
              }
            }],
            sourceType: `module`
          }
        }
      }
    }];
  });
  return markdownAST;
};

exports.remarkMdxHtmlPlugin = remarkMdxHtmlPlugin;