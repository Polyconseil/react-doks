// @flow

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

type Props = {
  /**
   * The title to display
   * @examples "Wonderful title", "Hello world"
   */
  title: string,
    /** The text inside the box */
  text: string,
  /** The container's width, in px */
  width: ?number,
  /** Toggles the dark background with white text */
  negative: bool,
};

export default class WonderfulComponent extends Component {
  props: Props;

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
