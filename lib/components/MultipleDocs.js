'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SingleDoc = require('./SingleDoc');

var _SingleDoc2 = _interopRequireDefault(_SingleDoc);

var _SidePanel = require('./SidePanel');

var _SidePanel2 = _interopRequireDefault(_SidePanel);

var _DraggableBar = require('./DraggableBar');

var _DraggableBar2 = _interopRequireDefault(_DraggableBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-console */
/* eslint-disable global-require */

var WRAPPER_STYLE = {
  backgroundColor: 'white',
  margin: 0,
  padding: 0,
  height: '100%',
  width: '100%'
};

var DOC_STYLE = {
  height: '100%',
  overflow: 'auto'
};

var Docs = function (_React$Component) {
  _inherits(Docs, _React$Component);

  function Docs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Docs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Docs.__proto__ || Object.getPrototypeOf(Docs)).call.apply(_ref, [this].concat(args))), _this), _this.DOCS_FOLDER = DOCS_EXPLORER_REQUIRE_CONTEXT_DOCS_FOLDERS, _this.state = {
      components: [],
      displayedComponentPath: null,
      sidePanelWidth: 350,
      sidePanelCollapsed: true
    }, _this.generateComponentName = function (request) {
      var DOCS_FOLDER = _this.DOCS_FOLDER;
      var INDEX_JS = 'index.js';

      // Stripping "./" :
      var path = request.startsWith('./') ? request.substring(2) : request;

      // Removing index.js ('a/b/index.js' => 'a/b')
      if (path.endsWith(INDEX_JS)) {
        return path.substr(0, path.length - DOCS_FOLDER.length - INDEX_JS.length - 2);
      }

      // Striping __docs__ :
      var pathWithoutDoc = path.replace(new RegExp('/?' + DOCS_FOLDER + '/'), ':');

      var name = pathWithoutDoc.startsWith(':') ? pathWithoutDoc.substring(1) : pathWithoutDoc;

      // Stripping extension // TODO .jsx ?
      return name.substr(0, name.length - 3);
    }, _this.setDisplayedComponent = function (path) {
      var docComponent = _this.state.components.find(function (c) {
        return c.filePath === path;
      });
      location.hash = docComponent.name;
      _this.setState({ displayedComponentPath: docComponent.filePath });
    }, _this.onSidePanelDrag = function (width) {
      if (width > 170) {
        _this.setState({ sidePanelWidth: width });
      } else {
        _this.setState({ sidePanelWidth: 170 });
      }
    }, _this.onSidePanelCollapse = function () {
      _this.setState({ sidePanelCollapsed: !_this.state.sidePanelCollapsed });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Name of the folders where the docs components will be fetched :
   */


  /**
   * this.props.context must be obtained via WP's require.context()
   * It is a function behaving like require, that allow to fetch a list of all modules matching a certain RegExp
   */


  _createClass(Docs, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // Map the require.context files to a list of components :
      // require.context keys() returns a list of all "requests" (so-called by WP doc), ie file paths (ie strings that
      // can be passed to the context function) matching the conditions given to require.context
      var components = this.props.context.keys().map(function (filePath) {
        return {
          filePath: filePath,
          name: _this2.generateComponentName(filePath)
        };
      });

      // Store location as hash URL :
      var selectedName = location.hash.substr(1).trim();

      var displayedComponentPath = null;
      if (selectedName) {
        displayedComponentPath = components.find(function (c) {
          return c.name === selectedName;
        }).filePath;
      }

      // Store in state :
      this.setState({
        components: components,
        displayedComponentPath: displayedComponentPath
      });
    }

    /**
     * Generate the component's canonical name from its file path
     * The generated name is to be used in URL hash and as a title for the doc
     */


    /**
     * Pick a new component to be displayed + update URL hash
     * Used as click callback for each one of the links displayed in the tree view in the SidePanel component
     * @param string path file path of the chosen component
     */

  }, {
    key: 'render',
    value: function render() {
      /*
       Fetch data exported by the doc component :
       * Explorer : demo component
       * DocumentedComponent : component to be injected in the doc's playgrounds scope
       * source : source code of the component to automatically generate its API doc (props table)
       * overview : markdown, including example of code in playgrounds
       */
      var displayedDoc = void 0;
      if (this.state.displayedComponentPath) {
        displayedDoc = this.props.context(this.state.displayedComponentPath);
      }

      return _react2.default.createElement(
        'div',
        { className: 'demo', style: WRAPPER_STYLE },
        _react2.default.createElement(_SidePanel2.default, {
          width: this.state.sidePanelWidth,
          components: this.state.components,
          onSelect: this.setDisplayedComponent,
          selected: this.state.displayedComponentPath,
          collapsed: this.state.sidePanelCollapsed,
          onCollapse: this.onSidePanelCollapse
        }),
        !this.state.sidePanelCollapsed && _react2.default.createElement(_DraggableBar2.default, { left: this.state.sidePanelWidth, onChange: this.onSidePanelDrag, style: { inner: { width: 3, backgroundColor: 'rgb(23,31,40)' } } }),
        _react2.default.createElement(
          'div',
          { style: DOC_STYLE },
          this.state.displayedComponentPath ? _react2.default.createElement(_SingleDoc2.default, { doc: displayedDoc, name: this.generateComponentName(this.state.displayedComponentPath), key: this.state.displayedComponentPath }) : _react2.default.createElement(
            'p',
            { style: { fontSize: 30, width: '100%', marginTop: '200px', textAlign: 'center' } },
            'Please select a component in the list'
          )
        )
      );
    }
  }]);

  return Docs;
}(_react2.default.Component);

Docs.propTypes = {
  context: _react2.default.PropTypes.func.isRequired
};
exports.default = Docs;