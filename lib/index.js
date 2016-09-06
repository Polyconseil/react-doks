'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
requireSingleFile will be replaced by a hard-coded boolean in the transpiled source, and webpack will not even read
the side that will not be executed. This allows us to require as few components as possible, and build a bundle as
small as possible :
*/
if (DOCS_EXPLORER_SINGLE_FILE) {
  var EcologyWrapper = require('./components/SingleDoc.js').default;
  // Requiring the single file, and rendering only this doc :
  var singleDoc = require(DOCS_EXPLORER_REQUIRE_CONTEXT_ROOT);

  _reactDom2.default.render(_react2.default.createElement(EcologyWrapper, { doc: singleDoc }), document.getElementById('root'));
} else {
  var Docs = require('./components/MultipleDocs').default;

  // Rendering a full docs page with a side panel :
  var requireDoc = require.context(DOCS_EXPLORER_REQUIRE_CONTEXT_ROOT, true, DOCS_EXPLORER_REQUIRE_CONTEXT_REGEXP);
  _reactDom2.default.render(_react2.default.createElement(Docs, { context: requireDoc }), document.getElementById('root'));
}