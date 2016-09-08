/* eslint-disable no-console */
/* eslint-disable global-require */

import React from 'react';
import SingleDoc from './SingleDoc';
import SidePanel from './SidePanel';
import DraggableBar from './DraggableBar';
import cleanFilePath from '../utils/cleanFilePath';

const WRAPPER_STYLE = {
  backgroundColor: 'white',
  margin: 0,
  padding: 0,
  height: '100%',
  width: '100%',
};

const DOC_STYLE = {
  height: '100%',
  overflow: 'auto',
};

export default class Docs extends React.Component {
  /**
   * Name of the folders where the docs components will be fetched :
   */
  DOCS_FOLDER = DOCS_EXPLORER_REQUIRE_CONTEXT_DOCS_FOLDERS;

  /**
   * this.props.context must be obtained via WP's require.context()
   * It is a function behaving like require, that allow to fetch a list of all modules matching a certain RegExp
   */
  static propTypes = {
    context: React.PropTypes.func.isRequired,
  };

  state = {
    components: [],
    displayedComponentPath: null,
    sidePanelWidth: 350,
    sidePanelCollapsed: true,
  }

  componentWillMount() {
    // Map the require.context files to a list of components :
    // require.context keys() returns a list of all "requests" (so-called by WP doc), ie file paths (ie strings that
    // can be passed to the context function) matching the conditions given to require.context
    const components = this.props.context.keys().map((filePath) => {
      return ({
        filePath,
        name: cleanFilePath(filePath),
      });
    });

    // Store location as hash URL :
    const selectedName = location.hash.substr(1).trim();

    let displayedComponentPath = null;
    if (selectedName) {
      displayedComponentPath = components.find(c => c.name === selectedName).filePath;
    }

    // Store in state :
    this.setState({
      components,
      displayedComponentPath,
    });
  }

  /**
   * Pick a new component to be displayed + update URL hash
   * Used as click callback for each one of the links displayed in the tree view in the SidePanel component
   * @param string path file path of the chosen component
   */
  setDisplayedComponent = (path) => {
    const docComponent = this.state.components.find(c => c.filePath === path);
    location.hash = docComponent.name;
    this.setState({ displayedComponentPath: docComponent.filePath });
  }

  onSidePanelDrag = (width) => {
    if (width > 170) {
      this.setState({sidePanelWidth: width});
    } else {
      this.setState({sidePanelWidth: 170});
    }
  }

  onSidePanelCollapse = () => {
    this.setState({sidePanelCollapsed: !this.state.sidePanelCollapsed});
  }

  render() {
    /*
     Fetch data exported by the doc component :
     * Explorer : demo component
     * DocumentedComponent : component to be injected in the doc's playgrounds scope
     * source : source code of the component to automatically generate its API doc (props table)
     * overview : markdown, including example of code in playgrounds
     */
    let displayedDoc;
    if (this.state.displayedComponentPath) {
      displayedDoc = this.props.context(this.state.displayedComponentPath);
    }

    return (
      <div className="demo" style={WRAPPER_STYLE}>
        <SidePanel
          width={this.state.sidePanelWidth}
          components={this.state.components}
          onSelect={this.setDisplayedComponent}
          selected={this.state.displayedComponentPath}
          collapsed={this.state.sidePanelCollapsed}
          onCollapse={this.onSidePanelCollapse}
        />

        { !this.state.sidePanelCollapsed &&
          <DraggableBar left={this.state.sidePanelWidth} onChange={this.onSidePanelDrag} style={{inner: {width: 5, backgroundColor: 'rgb(23,31,40)'}}} />
        }

        <div style={DOC_STYLE}>
          { this.state.displayedComponentPath ?
            <SingleDoc doc={displayedDoc} name={cleanFilePath(this.state.displayedComponentPath)} key={this.state.displayedComponentPath} />
            :
            <p style={{fontSize: 30, width: '100%', marginTop: '200px', textAlign: 'center'}}>
              Please select a component in the list
            </p>
          }
        </div>

      </div>
    );
  }
}
