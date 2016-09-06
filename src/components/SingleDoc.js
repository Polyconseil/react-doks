import React from 'react';
import ReactDOM from 'react-dom';
import Ecology from 'ecology';
import FontAwesome from 'react-fontawesome';
import * as docgen from 'react-docgen';


const BLOCK_HEADER_MIXIN = {
  boxSizing: 'border-box',
  padding: 10,
  fontSize: 14,
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
  margin: '45px auto 0 auto',
};

const BLOCK_CONTENT_MIXIN = {
  boxSizing: 'border-box',
  padding: 45,
};

const TITLES_MIXIN = {
  color: 'rgb(128,128,128)',
  boxSizing: 'border-box',
  minWidth: 200,
  maxWidth: 980,
  textAlign: 'center',
  fontWeight: 'bold',
};

const BLOCK_HEADER_EXPANDED_STYLE = {
  ...BLOCK_HEADER_MIXIN,
  width: '100%',
  borderTop: '1px solid #d8d8d8',
};

const BLOCK_HEADER_COLLAPSED_STYLE = {
  ...BLOCK_HEADER_MIXIN,
  minWidth: 200,
  maxWidth: 980,
  border: '1px solid #d8d8d8',
  borderBottom: 0,
  borderTopRightRadius: 3,
  borderTopLeftRadius: 3,
};

const BLOCK_CONTENT_COLLAPSED_STYLE = {
  ...BLOCK_CONTENT_MIXIN,
  minWidth: 350,
  maxWidth: 980,
  margin: '0 auto',
  border: '1px solid #d8d8d8',
  borderBottomRightRadius: 3,
  borderBottomLeftRadius: 3,
  overflow: 'auto',
};

const BLOCK_CONTENT_EXPANDED_STYLE = {
  ...BLOCK_CONTENT_MIXIN,
  width: '100%',
  margin: '0',
  borderTop: '1px solid #d8d8d8',
  borderBottom: '1px solid #d8d8d8',
};

export default class EcologyWrapper extends React.Component {
  state = {
    explorerExpanded: false,
  }

  static propTypes = {
    name: React.PropTypes.string,
    doc: React.PropTypes.object.isRequired,
  }

  defaultProps = {
    name: '',
  }

  toggleExplorerExpanded = () => {
    this.setState({ explorerExpanded: !this.state.explorerExpanded });
  }

  render() {
    // Fetching docs elements from the object passed as prop :
    const { Explorer, documentedComponents, source, overview } = {...this.props.doc};

    const playgroundScope = {React, ReactDOM};

    if (documentedComponents) {
      if (typeof documentedComponents !== 'object') {
        throw new Error('Please export documentedComponent as an object of React components');
      }

      Object.keys(documentedComponents).forEach((name) => {
        playgroundScope[name] = documentedComponents[name];
      });
    }

    const DocumentedComponentName = false;

    return (
      <div>
        { DocumentedComponentName ?
          <div>
            <h1 style={{ ...TITLES_MIXIN, margin: '45px auto 0 auto', fontSize: '2em' }}>{ DocumentedComponentName }</h1>
            <h2 style={{ ...TITLES_MIXIN, margin: '0 auto', fontSize: '1.6em' }}>{ this.props.name }</h2>
          </div>
        :
          <h1 style={{ ...TITLES_MIXIN, margin: '45px auto 0 auto', fontSize: '2em' }}>{ this.props.name }</h1>
        }

        { Explorer &&
          <div>
            <h3 style={ this.state.explorerExpanded ? BLOCK_HEADER_EXPANDED_STYLE : BLOCK_HEADER_COLLAPSED_STYLE }>
              <FontAwesome name="play" />&nbsp;&nbsp;Play it !
              <span
                style={{cursor: 'pointer', float: 'right'}}
                onClick={this.toggleExplorerExpanded}>

                { this.state.explorerExpanded ?
                  <span>
                    <FontAwesome name="angle-right" />&nbsp;<FontAwesome name="angle-left" />&nbsp;&nbsp;Collapse
                  </span>
                  :
                  <span><FontAwesome name="arrows-h" />&nbsp;&nbsp;Expand</span>
                }
              </span>
            </h3>
            <div style={ this.state.explorerExpanded ? BLOCK_CONTENT_EXPANDED_STYLE : BLOCK_CONTENT_COLLAPSED_STYLE }>
              <Explorer />
            </div>
          </div>
        }

        <h3 style={ BLOCK_HEADER_COLLAPSED_STYLE }><FontAwesome name="file-text-o" />&nbsp;&nbsp;readme.md</h3>

        <div id={"ecology"} className="markdown-body" style={ BLOCK_CONTENT_COLLAPSED_STYLE }>
          <Ecology
            exportGist
            copyToClipboard
            overview={ overview || 'No overview found' }
            source={ source ? docgen.parse(source, docgen.findAllExportedComponentDefinitions) : null }
            scope={ playgroundScope }
            playgroundtheme="monokai"
            customRenderers={{
              link: (href, title, text) => `<a href=${href} target="_blank">${text}</a>`,
            }}
          />
        </div>
      </div>
    );
  }
}
