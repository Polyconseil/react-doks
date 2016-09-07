import React, { Component } from 'react';

const defaultStyle = {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  inner: {
    backgroundColor: 'black',
    top: 0,
    bottom: 0,
    width: '1px',
    margin: '0 auto',
    position: 'absolute',
  },
};

export default class DraggableBar extends Component {

  static propTypes = {
    left: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  state = {
    isHovering: false,
    isDragging: false,
  };

  componentWillUnmount = () => {
    this.clearListeners();
  }

  clearListeners = () => {
    document.removeEventListener('mousemove', this.duringDragging, true);
    document.removeEventListener('mouseup', this.endDragging, true);
  }

  initialX = 0;
  initialLeft = this.props.left;
  prevT = Date.now();

  startDragging = (event) => {
    if (!this.state.isDragging) {
      this.initialX = event.clientX;
      this.initialLeft = this.props.left;

      document.addEventListener('mousemove', this.duringDragging, true);
      document.addEventListener('mouseup', this.endDragging, true);
      this.setState({ isDragging: true });
    }
  }
  endDragging = () => {
    if (this.state.isDragging) {
      this.initialX = 0;
      this.initialLeft = this.props.left;
      this.clearListeners();
      this.setState({ isDragging: false });
    }
  }
  duringDragging = (event) => {
    document.getSelection().removeAllRanges();// éviter les sélections intempestives
    const now = Date.now();
    if (now - this.prevT < 10) {
      return; // Ne pas repaint plus d'une fois toutes les 10ms
    }
    this.prevT = now;
    if (event.clientX === 0) {// est parfois envoyé en fin de drag (Chrome)
      return;
    }

    const newLeft = this.initialLeft + (event.clientX - this.initialX);
    this.props.onChange(newLeft);
  }

  separatorOver = () => {
    this.setState({isHovering: true});
  }
  separatorOut = () => {
    this.setState({isHovering: false});
  }

  render() {
    const {left, style} = this.props;
    const {isHovering} = this.state;

    return (
      <div
        style={{...defaultStyle.container, ...style.container, left, cursor: isHovering ? 'ew-resize' : null}}
        draggable="false"
        onMouseDown={this.startDragging}
        onDragStart={this.endDragging}
        onMouseEnter={this.separatorOver}
        onMouseLeave={this.separatorOut}>
        <div style={{...defaultStyle.inner, ...style.inner}}></div>
      </div>
    );
  }
}
