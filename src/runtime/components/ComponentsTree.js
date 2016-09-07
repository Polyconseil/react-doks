import React from 'react';
import FontAwesome from 'react-fontawesome';

const LIST_STYLE = {
  boxSizing: 'border-box',
  overflowX: 'hidden',
  paddingTop: 15,
  paddingBottom: 15,
};

const LIST_TITLE_STYLE = {
  whiteSpace: 'nowrap',
  marginTop: 15,
};

/**
 * Renders a tree view of components, given an array of {filePath, name} objects
 */
export default class ComponentsTree extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    components: React.PropTypes.arrayOf(React.PropTypes.shape({
      filePath: React.PropTypes.string, // File path, aka Webpack request to fetch component,
      name: React.PropTypes.string, // name to be displayed in the list
    })).isRequired,
    selected: React.PropTypes.string,
  }

  /**
   * Build a JS object representing the folders / files tree from a component list :
   */
  buildTree = (componentsList) => {
    // Deciding whether we must begin from the root of the tree or we only have to populate a node of the given tree
    const tree = {};

    componentsList.forEach((component) => {
      const foldersArray = component.name.split('/');

      // Getting the top node of the component :
      const treeNodeName = foldersArray.shift();

      if (foldersArray.length) {
        // If we still have folders in the path to recurse over, we build every subnode :

        // Building the subnode for this specific path :
        const subtree = this.buildTree([{
          name: foldersArray.join('/'),
          filePath: component.filePath,
        }]);

        // Concatenate the siblings node with the one we just built :
        tree[treeNodeName] = { ...tree[treeNodeName], ...subtree };
      } else {
        // Otherwise, we simply store the filepath :
        tree[treeNodeName] = component.filePath;
      }
    });

    return tree;
  };

  onClick = (event) => {
    event.preventDefault();
    this.props.onClick(event.target.getAttribute('data-path'));
  };

  /**
   * Render a tree object as array (of arrays (of arrays)[...])  of JSX markup
   * Terminology :
   * - a "node" is a key in the tree that has children (it's an object itself)
   * - a "leave" is a terminal key in the tree object (aka scalar value). Here, it is a string
   *
   */
  renderTree = (tree, recurseCount = 0) => {
    const render = [];
    Object.keys(tree)
      .sort((key1, key2) => {
        // Sorting the list :
        // Same type means we're comparing two nodes or two leaves of the tree
        if (typeof tree[key1] === typeof tree[key2]) {
          if (typeof tree[key1] === 'object') {
            // Two objects : we're comparing two nodes => sort by node name
            return key1.localeCompare(key2);
          }
          // Two strings : we're comparing two leaves : sort by leave name
          return tree[key1].localeCompare(tree[key2]);
        }
        // Comparing a leave and a node : we put leaves (files) before nodes (folders)
        if (typeof tree[key1] === 'object' && typeof tree[key2] === 'string') return 1;
        return -1;
      })
      .forEach(nodeName => {
        const nodeContent = tree[nodeName];
        // Displaying a leave :
        const paddingLeft = (20 * recurseCount) + 10;
        if (typeof nodeContent === 'string') {
          render.push(
            <li
              key={nodeContent}
              data-path={nodeContent}
              onClick={ this.onClick }
              style={{
                cursor: 'pointer',
                listStyleType: 'none',
                whiteSpace: 'nowrap',
                color: this.props.selected === nodeContent ? 'rgb(23,31,40)' : 'white',
                backgroundColor: this.props.selected === nodeContent ? '#FAFAFA' : 'transparent',
                paddingLeft,
              }}>
              { nodeName }
            </li>
          );
        } else {
          // Displaying a node, recursively :
          render.push(<li style={{...LIST_TITLE_STYLE, paddingLeft}} key={nodeName} className="components-folder"><FontAwesome name="folder" />&nbsp;&nbsp;{ nodeName }</li>);
          render.push(this.renderTree(nodeContent, recurseCount + 1));
        }
      });

    /* Key = joining the different paths of this folder with a separator, to guarantee unique key (two folders shouldn't have exactly the same content) */
    return (
      <ul key={Object.keys(tree).join('+')} style={{ marginLeft: 0 }}>
        { render }
      </ul>
    );
  };

  render() {
    const tree = this.buildTree(this.props.components);

    return (
      <div style={LIST_STYLE} className="components-list"> {/* Classname is for tests with enzyme */}
          { this.renderTree(tree) }
      </div>
    );
  }
}
