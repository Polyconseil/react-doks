import React, { Component } from 'react';

const STYLE_COMMON = {
  padding: 10,
  boxSizing: 'border-box',
};

const STYLE_NEGATIVE = {
  ...STYLE_COMMON,
  border: '1px solid white',
  background: 'black',
  color: 'white',
};

const STYLE_DEFAULT = {
  ...STYLE_COMMON,
  border: '1px solid black',

};

export default class WonderfulComponent extends Component {
  static propTypes = {
    /**
     * The title to display
     * @examples "Wonderful title", "Hello world"
     */
    title: React.PropTypes.string.isRequired,
    /**
     * The text inside the box
     */
    text: React.PropTypes.string.isRequired,
    /**
     * The container's width, in px
     */
    width: React.PropTypes.number,
    /**
     * Toggles the dark background with white text
     */
    negative: React.PropTypes.bool,
  }

  static defaultProps = {
    negative: false,
    width: 400,
  }

  render() {
    const appliedStyle = this.props.negative ? STYLE_NEGATIVE : STYLE_DEFAULT;
    const style = {
      ...appliedStyle,
      width: this.props.width,
    };
    return (
      <div style={style}>
        <h2 style={{ borderBottom: '1px solid red' }}>{ this.props.title }</h2>
        <p>{ this.props.text }</p>
      </div>
    );
  }
}