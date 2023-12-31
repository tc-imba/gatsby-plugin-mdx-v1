"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const remarkInferTocMeta = options => {
  const {
    toc,
    visit,
    maxDepth
  } = {
    maxDepth: 6,
    ...options
  };

  const processToC = (node, current) => {
    if (!node) {
      return {};
    } else if (node.type === `paragraph`) {
      visit(node, item => {
        if (item.type === `link`) {
          current.url = item.url;
        }

        if (item.type === `text`) {
          current.title = item.value;
        }
      });
      return current;
    } else if (Array.isArray(node.children)) {
      if (node.type === `list`) {
        current.items = node.children.map(i => processToC(i, {}));
        return current;
      } else if (node.type === `listItem`) {
        const heading = processToC(node.children[0], {});

        if (node.children.length > 1) {
          processToC(node.children[1], heading);
        }

        return heading;
      }
    }

    return {};
  };

  return (tree, file) => {
    const generatedToC = toc(tree, {
      maxDepth
    });
    const mdxFile = file;

    if (!mdxFile.data.meta) {
      mdxFile.data.meta = {};
    }

    mdxFile.data.meta.toc = processToC(generatedToC.map, {});
  };
};

var _default = remarkInferTocMeta;
exports.default = _default;