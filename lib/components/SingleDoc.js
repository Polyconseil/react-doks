'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ecology = require('ecology');

var _ecology2 = _interopRequireDefault(_ecology);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactDocgen = require('react-docgen');

var docgen = _interopRequireWildcard(_reactDocgen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BLOCK_HEADER_MIXIN = {
  boxSizing: 'border-box',
  padding: 10,
  fontSize: 14,
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
  margin: '45px auto 0 auto'
};

var BLOCK_CONTENT_MIXIN = {
  boxSizing: 'border-box',
  padding: 45
};

var TITLES_MIXIN = {
  color: 'rgb(128,128,128)',
  boxSizing: 'border-box',
  minWidth: 200,
  maxWidth: 980,
  textAlign: 'center',
  fontWeight: 'bold'
};

var BLOCK_HEADER_EXPANDED_STYLE = _extends({}, BLOCK_HEADER_MIXIN, {
  width: '100%',
  borderTop: '1px solid #d8d8d8'
});

var BLOCK_HEADER_COLLAPSED_STYLE = _extends({}, BLOCK_HEADER_MIXIN, {
  minWidth: 200,
  maxWidth: 980,
  border: '1px solid #d8d8d8',
  borderBottom: 0,
  borderTopRightRadius: 3,
  borderTopLeftRadius: 3
});

var BLOCK_CONTENT_COLLAPSED_STYLE = _extends({}, BLOCK_CONTENT_MIXIN, {
  minWidth: 350,
  maxWidth: 980,
  margin: '0 auto',
  border: '1px solid #d8d8d8',
  borderBottomRightRadius: 3,
  borderBottomLeftRadius: 3,
  overflow: 'auto'
});

var BLOCK_CONTENT_EXPANDED_STYLE = _extends({}, BLOCK_CONTENT_MIXIN, {
  width: '100%',
  margin: '0',
  borderTop: '1px solid #d8d8d8',
  borderBottom: '1px solid #d8d8d8'
});

var EcologyWrapper = function (_React$Component) {
  _inherits(EcologyWrapper, _React$Component);

  function EcologyWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EcologyWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EcologyWrapper.__proto__ || Object.getPrototypeOf(EcologyWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      explorerExpanded: false
    }, _this.defaultProps = {
      name: ''
    }, _this.toggleExplorerExpanded = function () {
      _this.setState({ explorerExpanded: !_this.state.explorerExpanded });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EcologyWrapper, [{
    key: 'render',
    value: function render() {
      // Fetching docs elements from the object passed as prop :
      var _props$doc = _extends({}, this.props.doc);

      var Explorer = _props$doc.Explorer;
      var documentedComponents = _props$doc.documentedComponents;
      var source = _props$doc.source;
      var overview = _props$doc.overview;


      var playgroundScope = { React: _react2.default, ReactDOM: _reactDom2.default };

      if (documentedComponents) {
        if ((typeof documentedComponents === 'undefined' ? 'undefined' : _typeof(documentedComponents)) !== 'object') {
          throw new Error('Please export documentedComponent as an object of React components');
        }

        Object.keys(documentedComponents).forEach(function (name) {
          playgroundScope[name] = documentedComponents[name];
        });
      }

      var DocumentedComponentName = false;

      return _react2.default.createElement(
        'div',
        null,
        DocumentedComponentName ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            { style: _extends({}, TITLES_MIXIN, { margin: '45px auto 0 auto', fontSize: '2em' }) },
            DocumentedComponentName
          ),
          _react2.default.createElement(
            'h2',
            { style: _extends({}, TITLES_MIXIN, { margin: '0 auto', fontSize: '1.6em' }) },
            this.props.name
          )
        ) : _react2.default.createElement(
          'h1',
          { style: _extends({}, TITLES_MIXIN, { margin: '45px auto 0 auto', fontSize: '2em' }) },
          this.props.name
        ),
        Explorer && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h3',
            { style: this.state.explorerExpanded ? BLOCK_HEADER_EXPANDED_STYLE : BLOCK_HEADER_COLLAPSED_STYLE },
            _react2.default.createElement(_reactFontawesome2.default, { name: 'play' }),
            '  Play it !',
            _react2.default.createElement(
              'span',
              {
                style: { cursor: 'pointer', float: 'right' },
                onClick: this.toggleExplorerExpanded },
              this.state.explorerExpanded ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactFontawesome2.default, { name: 'angle-right' }),
                ' ',
                _react2.default.createElement(_reactFontawesome2.default, { name: 'angle-left' }),
                '  Collapse'
              ) : _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactFontawesome2.default, { name: 'arrows-h' }),
                '  Expand'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { style: this.state.explorerExpanded ? BLOCK_CONTENT_EXPANDED_STYLE : BLOCK_CONTENT_COLLAPSED_STYLE },
            _react2.default.createElement(Explorer, null)
          )
        ),
        _react2.default.createElement(
          'h3',
          { style: BLOCK_HEADER_COLLAPSED_STYLE },
          _react2.default.createElement(_reactFontawesome2.default, { name: 'file-text-o' }),
          '  readme.md'
        ),
        _react2.default.createElement(
          'div',
          { id: "ecology", className: 'markdown-body', style: BLOCK_CONTENT_COLLAPSED_STYLE },
          _react2.default.createElement(_ecology2.default, {
            exportGist: true,
            copyToClipboard: true,
            overview: overview || 'No overview found',
            source: source ? docgen.parse(source, docgen.findAllExportedComponentDefinitions) : null,
            scope: playgroundScope,
            playgroundtheme: 'monokai',
            customRenderers: {
              link: function link(href, title, text) {
                return '<a href=' + href + ' target="_blank">' + text + '</a>';
              }
            }
          })
        )
      );
    }
  }]);

  return EcologyWrapper;
}(_react2.default.Component);

EcologyWrapper.propTypes = {
  name: _react2.default.PropTypes.string,
  doc: _react2.default.PropTypes.object.isRequired
};
exports.default = EcologyWrapper;