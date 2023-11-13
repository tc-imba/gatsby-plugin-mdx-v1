"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remarkPathPlugin = void 0;

var _cacheHelpers = require("./cache-helpers");

// ensure only one `/` in new url
const withPathPrefix = (url, pathPrefix) => (pathPrefix + url).replace(/\/\//, `/`); // Ensure relative links include `pathPrefix`


const remarkPathPlugin = ({
  pathPrefix
}) => async function transformer(markdownAST) {
  if (!pathPrefix) {
    return markdownAST;
  }

  const {
    visit
  } = await (0, _cacheHelpers.cachedImport)(`unist-util-visit`);
  visit(markdownAST, [`link`, `definition`], node => {
    if (node.url && typeof node.url === `string` && node.url.startsWith(`/`) && !node.url.startsWith(`//`)) {
      node.url = withPathPrefix(node.url, pathPrefix);
    }
  });
  return markdownAST;
};

exports.remarkPathPlugin = remarkPathPlugin;