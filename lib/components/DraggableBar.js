'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyle = {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  inner: {
    backgroundColor: 'black',
    top: 0,
    bottom: 0,
    width: '1px',
    margin: '0 auto',
    position: 'absolute'
  }
};

var DraggableBar = function (_Component) {
  _inherits(DraggableBar, _Component);

  function DraggableBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggableBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableBar.__proto__ || Object.getPrototypeOf(DraggableBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isHovering: false,
      isDragging: false
    }, _this.componentWillUnmount = function () {
      _this.clearListeners();
    }, _this.clearListeners = function () {
      document.removeEventListener('mousemove', _this.duringDragging, true);
      document.removeEventListener('mouseup', _this.endDragging, true);
    }, _this.initialX = 0, _this.initialLeft = _this.props.left, _this.prevT = Date.now(), _this.startDragging = function (event) {
      if (!_this.state.isDragging) {
        _this.initialX = event.clientX;
        _this.initialLeft = _this.props.left;

        document.addEventListener('mousemove', _this.duringDragging, true);
        document.addEventListener('mouseup', _this.endDragging, true);
        _this.setState({ isDragging: true });
      }
    }, _this.endDragging = function () {
      if (_this.state.isDragging) {
        _this.initialX = 0;
        _this.initialLeft = _this.props.left;
        _this.clearListeners();
        _this.setState({ isDragging: false });
      }
    }, _this.duringDragging = function (event) {
      document.getSelection().removeAllRanges(); // éviter les sélections intempestives
      var now = Date.now();
      if (now - _this.prevT < 10) {
        return; // Ne pas repaint plus d'une fois toutes les 10ms
      }
      _this.prevT = now;
      if (event.clientX === 0) {
        // est parfois envoyé en fin de drag (Chrome)
        return;
      }

      var newLeft = _this.initialLeft + (event.clientX - _this.initialX);
      _this.props.onChange(newLeft);
    }, _this.separatorOver = function () {
      _this.setState({ isHovering: true });
    }, _this.separatorOut = function () {
      _this.setState({ isHovering: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraggableBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var left = _props.left;
      var style = _props.style;
      var isHovering = this.state.isHovering;


      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, defaultStyle.container, style.container, { left: left, cursor: isHovering ? 'ew-resize' : null }),
          draggable: 'false',
          onMouseDown: this.startDragging,
          onDragStart: this.endDragging,
          onMouseEnter: this.separatorOver,
          onMouseLeave: this.separatorOut },
        _react2.default.createElement('div', { style: _extends({}, defaultStyle.inner, style.inner) })
      );
    }
  }]);

  return DraggableBar;
}(_react.Component);

DraggableBar.propTypes = {
  left: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func.isRequired,
  style: _react2.default.PropTypes.object
};
exports.default = DraggableBar;