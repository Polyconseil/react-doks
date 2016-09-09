import React from 'react';
import WonderfulComponent from '../WonderfulComponent';

export const overview = require('!!raw!./WonderfulComponent.md');
export const documentedComponents = { WonderfulComponent };
export const source = require('!!raw!../WonderfulComponent');

export class Explorer extends React.Component {
  state = {
    negative: false,
    width: 500,
    title: 'Wonderful title goes here',
  }

  onNegative = () => {
    this.setState({ negative: !this.state.negative});
  }

  onWidth = (e) => {
    this.setState({width: e.target.value});
  }

  onTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  render() {
    const wonderfulText = 'Wonderful text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';

    return (
      <div>
        <h1>Here's an "Explorer" component :</h1>
        <p>An Explorer component must wrap the component you're documenting with a component taking no props.
          You can achieve this simply by mapping an interactive example allowing to set the props manually through inputs (or you can simply decide the props values to show your beautiful component at it best !).</p>
        <div><label><input type="checkbox" checked={this.state.negative} onChange={this.onNegative} />Negative</label></div>
        <div><label>Width : <input type="range" min={300} max={1000} onChange={this.onWidth} value={this.state.width} /></label></div>
        <div><label>Title : <input type="text" onChange={this.onTitleChange} value={this.state.title} /></label></div>

        <hr />

        <WonderfulComponent width={this.state.width} title={this.state.title} text={wonderfulText} negative={this.state.negative} />
      </div>
    );
  }
}
