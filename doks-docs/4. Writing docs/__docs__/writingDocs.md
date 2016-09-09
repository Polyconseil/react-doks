# Writing docs

## Development and documentation process... merged !

Doks allows you to develop your component in isolation, with hot reload. To achieve this, when your component's API is decided, start by creating an Explorer component in your docs folder, that somehow inputs props into the component you're developing. You can achieve this by mapping [an interactive example](#Demo/components/WonderfulComponent) allowing to set the props manually through inputs (or you can simply decide of the props values that show your beautiful component at it best !).

Then, launch Doks. You may launch it in single file mode to allow faster bundling :  
`doks path/to/__docs__/file.js`

Your dpcs file may export several elements :

### `Explorer` :

The wrapper taking no props we've discussed before :

```
export class Explorer extends React.Component {
    // hack hack hack
}
```


### `source` :

The source that will be parsed to generate the props table, using the PropTypes of your component. This should be a string. To get the code of your component's file as a string, you can require it with Webpack's raw loader :  
`export const source = require('!!raw!../MywonderfulComponent.js')`

You can add example values to your JSDOC using the following annotation `@examples 'example' 'another example'`.


### `overview`

A markdown string, which is meant to be the README for your component (notice how we outrageously copied Github's styling ?). Again to require the content of a markdown file as a string, use raw loader :  
`export const overview = require('!!raw!../MywonderfulComponent.js')`

Thanks to FormidableLab's [Ecology](https://github.com/FormidableLabs/ecology), you can add interactive code examples, like this one :

```playground_norender
class UsefulComponent extends React.Component {
    render() {
        return(<p>Hello, World !</p>);
    }
}

ReactDOM.render(<UsefulComponent />, mountNode);
```

### `documentedComponents`

This is required if you have included playgrounds in your markdown doc, and need to inject your own components into those playgrounds scope.

```
export const documentedComponents = { MyComponent, AnotherComponent }
```

For more details about the playgrounds and documentedComponents, see [Ecology's doc](https://github.com/FormidableLabs/ecology/blob/master/README.md).


## `// A few hacks later ...`

## Generating a static bundle

When you're happy with your component and its doc, run the following command from the root of your project (this is where you have put your `doks.config.js` file). 

`doks --build`

This will pack all your docs into a folder whose name is specified as the `staticBuildDir` option in your `doks.config.js`. This setting will default to `<project root>/docs`.
 
When this bundle is finished, you may serve it easily with any web server you like, for example through [Github pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch).

**HEADS UP :** If the target directory already exists, its content will be **deleted** when Doks builds your static docs.

## Bonus : Where should I put my docs ?

We believe every resource related to a piece of code (docs, tests...) should be located as close as this code as possible. Therefore, we chose to put our docs in subfolders of our components folders (exactly like the directory structure inside the doks-docs folder of the Doks repository).  
This has several upsides :
- find the docs source code easily when you're wondering how a component is meant to be used
- require shorter paths in your docs file
- when you want to extract a component (to open source it, to refactor it, or to put it in another repository), you can simply extract its containing folder. Much simpler than running around the whole project to find all the associated resources.

However, this doesn't allow to easily find all the docs of the application, when you want to browse all of them. That's why this tool was created for.
