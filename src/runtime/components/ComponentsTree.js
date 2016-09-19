import React from 'react';

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

  onClick = (event) => {
    event.preventDefault();
    this.props.onClick(event.target.getAttribute('data-path'));
  };

  render() {
    /**
     * Build a JS object representing the folders / files tree from a component list :
     *
     Shape of the tree object :
     [
     {
       name: 'components/foo/bar
       filePath: './components/foo/__docs__/bar.js
       children: [
         {
           name: 'components/foo/baz/Michelangelo',
           filePath: './components/foo/baz/__docs__/Michelangelo.js',
           children: [],
         },
         {
           name: 'components/foo/baz/Donatello',
           filePath: './components/foo/baz/__docs__/Donatello.js',
           children: [],
         }
       ]
     }
     ]
     */
    const buildTree = (componentsList, tree = []) => {
      componentsList.forEach((component) => {
        const foldersArray = component.name.split('/');
        const name = foldersArray.shift();
        const builtNode = tree.find(n => n.name === name);

        let node;
        if (builtNode) {
          node = builtNode;
        } else {
          node = {
            name,
            children: [],
          };
          tree.push(node);
        }

        if (foldersArray.length) {
          // Children nodes remaining :
          buildTree([{
            name: foldersArray.join('/'),
            filePath: component.filePath,
          }], node.children);
        } else {
          // Make the node clickable by adding its filepath :
          node.filePath = component.filePath;
        }
      });

      return tree;
    };

    /**
     * Render a tree object
     */
    const renderTree = (tree) => {
      tree.sort((node1, node2) => {
        return node1.name.localeCompare(node2.name);
      });

      return (
        <ul>
          { tree.map(node => {
            const clickable = typeof node.filePath !== 'undefined';
            const linkColor = this.props.selected === node.filePath ? 'rgb(23,31,40)' : 'white';

            const liProps = {
              key: node.name,
              style: {
                listStyleType: 'none',
                marginLeft: 20,
                marginBottom: 5,
              },
            };

            const spanProps = {
              onClick: clickable ? this.onClick : null,
              style: {
                cursor: clickable ? 'pointer' : 'default',
                whiteSpace: 'nowrap',
                color: clickable ? linkColor : 'rgb(158,158,158)',
                backgroundColor: this.props.selected === node.filePath ? '#FAFAFA' : 'transparent',
                padding: 3,
                borderRadius: 3,
              },
            };

            return (
              <li {...liProps}>
                <span {...spanProps} data-path={clickable && node.filePath}>{node.name }</span>
                { node.children && renderTree(node.children) }
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <div>
        {
          renderTree(buildTree(this.props.components))
        }
      </div>
    );
  }
}
