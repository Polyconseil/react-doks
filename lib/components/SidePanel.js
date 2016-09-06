'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _ComponentsTree = require('./ComponentsTree');

var _ComponentsTree2 = _interopRequireDefault(_ComponentsTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HEADER_HEIGHT = '135px'; // Exact px value (or another CSS unit) because used in CSS calc()

var CONTAINER_EXPANDED_STYLE = {
  height: '100vh',
  float: 'left',
  backgroundColor: 'rgb(23,31,40)',
  color: 'white'
};
var CONTAINER_COLLAPSED_STYLE = {
  width: 60,
  height: '100vh',
  float: 'left',
  backgroundColor: 'rgb(23,31,40)',
  color: 'white'
};
var HEADER_STYLE = {
  boxSizing: 'border-box',
  height: HEADER_HEIGHT,
  padding: '15px'
};
var H1_STYLE = {
  fontSize: '25px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  color: 'rgb(191,195,198)'
};
var HEADER_BUTTON_STYLE = {
  color: 'white',
  border: 0,
  background: 0,
  outline: 'none',
  margin: '0',
  fontSize: '22px',
  cursor: 'pointer'
};

var LIST_STYLE = {
  boxSizing: 'border-box',
  height: 'calc(100vh - ' + HEADER_HEIGHT + ')'
};

var SidePanel = function (_React$Component) {
  _inherits(SidePanel, _React$Component);

  function SidePanel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SidePanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SidePanel.__proto__ || Object.getPrototypeOf(SidePanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      filter: ''
    }, _this.onSelect = function (path) {
      _this.props.onSelect(path);
    }, _this.onKeyDown = function (e) {
      e.stopPropagation();
      // /!\ Required to prevent events attached directly to document to fire
      if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();

      if (e.key === 'Escape') {
        // Escape
        _this.clearSearch();
      }
    }, _this.onSearch = function (event) {
      // Filter the list of components with the content of the search box
      _this.setState({
        filter: event.target.value
      });
    }, _this.clearSearch = function () {
      _this.setState({ filter: '' });
    }, _this.renderScrollbar = function (_ref2) {
      var style = _ref2.style;

      var props = _objectWithoutProperties(_ref2, ['style']);

      var thumbStyle = {
        backgroundColor: 'rgba(255,255,255,.35)'
      };
      return _react2.default.createElement('div', _extends({
        style: _extends({}, style, thumbStyle)
      }, props));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Manage selection of a component :
   */


  /**
   * Manage escape key to clear filter bar :
   */


  /**
   * Manage list filtering :
   */


  /**
   * Clear filter bar :
   */


  _createClass(SidePanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var collapsed = this.props.collapsed;

      var filteredComponentsList = !collapsed ? this.props.components.filter(function (component) {
        return component.name.toLowerCase().indexOf(_this2.state.filter.toLowerCase()) !== -1;
      }) : null;

      return _react2.default.createElement(
        'div',
        {
          style: collapsed ? CONTAINER_COLLAPSED_STYLE : _extends({}, CONTAINER_EXPANDED_STYLE, { width: this.props.width }) },
        collapsed ? _react2.default.createElement(
          'div',
          { style: HEADER_STYLE },
          _react2.default.createElement(
            'button',
            {
              onClick: this.props.onCollapse,
              style: HEADER_BUTTON_STYLE },
            _react2.default.createElement(_reactFontawesome2.default, { name: 'bars' })
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', margin: '30px auto' } },
            _react2.default.createElement(
              'a',
              {
                href: '?',
                className: 'refreshLink',
                style: HEADER_BUTTON_STYLE },
              _react2.default.createElement(_reactFontawesome2.default, { name: 'refresh' })
            )
          )
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: HEADER_STYLE },
            _react2.default.createElement(
              'button',
              {
                onClick: this.props.onCollapse,
                style: HEADER_BUTTON_STYLE },
              _react2.default.createElement(_reactFontawesome2.default, { name: 'bars' })
            ),
            _react2.default.createElement(
              'a',
              { href: '?', style: { float: 'right', color: 'white', fontSize: 22 }, className: 'refreshLink' },
              _react2.default.createElement(_reactFontawesome2.default, { name: 'refresh' })
            ),
            _react2.default.createElement(
              'div',
              { style: { width: '100%', textAlign: 'center' } },
              _react2.default.createElement(
                'h1',
                { style: H1_STYLE },
                'React Doks'
              )
            ),
            _react2.default.createElement(
              'span',
              { style: { float: 'right', cursor: 'pointer', fontSize: 22 }, onClick: this.clearSearch },
              _react2.default.createElement(_reactFontawesome2.default, { name: 'times' })
            ),
            _react2.default.createElement('input', {
              value: this.state.filter,
              style: {
                width: this.props.width - 70,
                margin: '0 0 10px 0',
                padding: 7,
                borderRadius: 3,
                border: 'none',
                outline: 'none'
              },
              placeholder: 'Filter list',
              onChange: function onChange(e) {
                return _this2.onSearch(e);
              },
              ref: function ref(c) {
                return _this2.searchInput = c;
              },
              onKeyDown: this.onKeyDown })
          ),
          _react2.default.createElement(
            'div',
            { style: LIST_STYLE },
            _react2.default.createElement(
              _reactCustomScrollbars.Scrollbars,
              { renderThumbVertical: this.renderScrollbar },
              _react2.default.createElement(_ComponentsTree2.default, { selected: this.props.selected, onClick: this.onSelect, components: filteredComponentsList })
            )
          )
        )
      );
    }
  }]);

  return SidePanel;
}(_react2.default.Component);

SidePanel.propTypes = {
  selected: _react2.default.PropTypes.string,
  components: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    filePath: _react2.default.PropTypes.string, // File path, aka Webpack request to fetch component,
    name: _react2.default.PropTypes.string })).isRequired,
  onSelect: _react2.default.PropTypes.func.isRequired,
  width: _react2.default.PropTypes.number,
  collapsed: _react2.default.PropTypes.bool.isRequired,
  onCollapse: _react2.default.PropTypes.func.isRequired
};
SidePanel.defaultProps = {
  width: 250
};
exports.default = SidePanel;