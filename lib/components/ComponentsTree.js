'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LIST_STYLE = {
  boxSizing: 'border-box',
  overflowX: 'hidden',
  paddingTop: 15,
  paddingBottom: 15
};

var LIST_TITLE_STYLE = {
  whiteSpace: 'nowrap',
  marginTop: 15
};

/**
 * Renders a tree view of components, given an array of {filePath, name} objects
 */

var ComponentsTree = function (_React$Component) {
  _inherits(ComponentsTree, _React$Component);

  function ComponentsTree() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ComponentsTree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ComponentsTree.__proto__ || Object.getPrototypeOf(ComponentsTree)).call.apply(_ref, [this].concat(args))), _this), _this.buildTree = function (componentsList) {
      // Deciding whether we must begin from the root of the tree or we only have to populate a node of the given tree
      var tree = {};

      componentsList.forEach(function (component) {
        var foldersArray = component.name.split('/');

        // Getting the top node of the component :
        var treeNodeName = foldersArray.shift();

        if (foldersArray.length) {
          // If we still have folders in the path to recurse over, we build every subnode :

          // Building the subnode for this specific path :
          var subtree = _this.buildTree([{
            name: foldersArray.join('/'),
            filePath: component.filePath
          }]);

          // Concatenate the siblings node with the one we just built :
          tree[treeNodeName] = _extends({}, tree[treeNodeName], subtree);
        } else {
          // Otherwise, we simply store the filepath :
          tree[treeNodeName] = component.filePath;
        }
      });

      return tree;
    }, _this.onClick = function (event) {
      event.preventDefault();
      _this.props.onClick(event.target.getAttribute('data-path'));
    }, _this.renderTree = function (tree) {
      var recurseCount = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      var render = [];
      Object.keys(tree).sort(function (key1, key2) {
        // Sorting the list :
        // Same type means we're comparing two nodes or two leaves of the tree
        if (_typeof(tree[key1]) === _typeof(tree[key2])) {
          if (_typeof(tree[key1]) === 'object') {
            // Two objects : we're comparing two nodes => sort by node name
            return key1.localeCompare(key2);
          }
          // Two strings : we're comparing two leaves : sort by leave name
          return tree[key1].localeCompare(tree[key2]);
        }
        // Comparing a leave and a node : we put leaves (files) before nodes (folders)
        if (_typeof(tree[key1]) === 'object' && typeof tree[key2] === 'string') return 1;
        return -1;
      }).forEach(function (nodeName) {
        var nodeContent = tree[nodeName];
        // Displaying a leave :
        var paddingLeft = 20 * recurseCount + 10;
        if (typeof nodeContent === 'string') {
          render.push(_react2.default.createElement(
            'li',
            {
              key: nodeContent,
              'data-path': nodeContent,
              onClick: _this.onClick,
              style: {
                cursor: 'pointer',
                listStyleType: 'none',
                whiteSpace: 'nowrap',
                color: _this.props.selected === nodeContent ? 'rgb(23,31,40)' : 'white',
                backgroundColor: _this.props.selected === nodeContent ? '#FAFAFA' : 'transparent',
                paddingLeft: paddingLeft
              } },
            nodeName
          ));
        } else {
          // Displaying a node, recursively :
          render.push(_react2.default.createElement(
            'li',
            { style: _extends({}, LIST_TITLE_STYLE, { paddingLeft: paddingLeft }), key: nodeName, className: 'components-folder' },
            _react2.default.createElement(_reactFontawesome2.default, { name: 'folder' }),
            '  ',
            nodeName
          ));
          render.push(_this.renderTree(nodeContent, recurseCount + 1));
        }
      });

      /* Key = joining the different paths of this folder with a separator, to guarantee unique key (two folders shouldn't have exactly the same content) */
      return _react2.default.createElement(
        'ul',
        { key: Object.keys(tree).join('+'), style: { marginLeft: 0 } },
        render
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Build a JS object representing the folders / files tree from a component list :
   */


  /**
   * Render a tree object as array (of arrays (of arrays)[...])  of JSX markup
   * Terminology :
   * - a "node" is a key in the tree that has children (it's an object itself)
   * - a "leave" is a terminal key in the tree object (aka scalar value). Here, it is a string
   *
   */


  _createClass(ComponentsTree, [{
    key: 'render',
    value: function render() {
      var tree = this.buildTree(this.props.components);

      return _react2.default.createElement(
        'div',
        { style: LIST_STYLE, className: 'components-list' },
        ' ',
        this.renderTree(tree)
      );
    }
  }]);

  return ComponentsTree;
}(_react2.default.Component);

ComponentsTree.propTypes = {
  onClick: _react2.default.PropTypes.func.isRequired,
  components: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    filePath: _react2.default.PropTypes.string, // File path, aka Webpack request to fetch component,
    name: _react2.default.PropTypes.string })).isRequired,
  selected: _react2.default.PropTypes.string
};
exports.default = ComponentsTree;