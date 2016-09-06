import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import ComponentsTree from './ComponentsTree';

const HEADER_HEIGHT = '135px'; // Exact px value (or another CSS unit) because used in CSS calc()

const CONTAINER_EXPANDED_STYLE = {
  height: '100vh',
  float: 'left',
  backgroundColor: 'rgb(23,31,40)',
  color: 'white',
};
const CONTAINER_COLLAPSED_STYLE = {
  width: 60,
  height: '100vh',
  float: 'left',
  backgroundColor: 'rgb(23,31,40)',
  color: 'white',
};
const HEADER_STYLE = {
  boxSizing: 'border-box',
  height: HEADER_HEIGHT,
  padding: '15px',
};
const H1_STYLE = {
  fontSize: '25px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  color: 'rgb(191,195,198)',
};
const HEADER_BUTTON_STYLE = {
  color: 'white',
  border: 0,
  background: 0,
  outline: 'none',
  margin: '0',
  fontSize: '22px',
  cursor: 'pointer',
};

const LIST_STYLE = {
  boxSizing: 'border-box',
  height: `calc(100vh - ${HEADER_HEIGHT})`,
};

export default class SidePanel extends React.Component {

  static propTypes = {
    selected: React.PropTypes.string,
    components: React.PropTypes.arrayOf(React.PropTypes.shape({
      filePath: React.PropTypes.string, // File path, aka Webpack request to fetch component,
      name: React.PropTypes.string, // name to be displayed in the list
    })).isRequired,
    onSelect: React.PropTypes.func.isRequired,
    width: React.PropTypes.number,
    collapsed: React.PropTypes.bool.isRequired,
    onCollapse: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    width: 250,
  }

  state = {
    filter: '',
  }

  /**
   * Manage selection of a component :
   */
  onSelect = (path) => {
    this.props.onSelect(path);
  }

  /**
   * Manage escape key to clear filter bar :
   */
  onKeyDown = (e) => {
    e.stopPropagation();
    // /!\ Required to prevent events attached directly to document to fire
    if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();

    if (e.key === 'Escape') { // Escape
      this.clearSearch();
    }
  }

  /**
   * Manage list filtering :
   */
  onSearch = (event) => {
    // Filter the list of components with the content of the search box
    this.setState({
      filter: event.target.value,
    });
  }

  /**
   * Clear filter bar :
   */
  clearSearch = () => {
    this.setState({filter: ''});
  }

  renderScrollbar = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: 'rgba(255,255,255,.35)',
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  };

  render() {
    const collapsed = this.props.collapsed;

    const filteredComponentsList = !collapsed ? this.props.components.filter(
      component => component.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
    ) : null;

    return (
      <div
        style={
          collapsed
          ?
            CONTAINER_COLLAPSED_STYLE
          :
            {...CONTAINER_EXPANDED_STYLE, width: this.props.width }
        }>
        { collapsed ?
          <div style={HEADER_STYLE}>
            <button
              onClick={this.props.onCollapse}
              style={HEADER_BUTTON_STYLE}>
              <FontAwesome name="bars" />
            </button>
            <div style={{textAlign: 'center', margin: '30px auto'}}>
              <a
                href="?"
                className="refreshLink"
                style={HEADER_BUTTON_STYLE}>
                <FontAwesome name="refresh" />
              </a>
            </div>
          </div>
          :
          <div>
            <div style={HEADER_STYLE}>
              <button
                onClick={this.props.onCollapse}
                style={ HEADER_BUTTON_STYLE }>
                <FontAwesome name="bars" />
              </button>
              <a href="?" style={{float: 'right', color: 'white', fontSize: 22 }} className="refreshLink">
                <FontAwesome name="refresh" />
              </a>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h1 style={ H1_STYLE }>
                  React Doks
                </h1>
              </div>


              <span style={{float: 'right', cursor: 'pointer', fontSize: 22}} onClick={ this.clearSearch }>
                <FontAwesome name="times" />
              </span>
              <input
                value={ this.state.filter }
                style={{
                  width: this.props.width - 70,
                  margin: '0 0 10px 0',
                  padding: 7,
                  borderRadius: 3,
                  border: 'none',
                  outline: 'none',
                }}
                placeholder="Filter list"
                onChange={ (e) => this.onSearch(e) }
                ref={ (c) => this.searchInput = c }
                onKeyDown={ this.onKeyDown } />
            </div>
            <div style={LIST_STYLE}>
              <Scrollbars renderThumbVertical={this.renderScrollbar}>
                <ComponentsTree selected={this.props.selected} onClick={this.onSelect} components={ filteredComponentsList } />
              </Scrollbars>
            </div>
          </div>
        }
      </div>
    );
  }
}
