# Configuration reference

```javascript
// doks.config.js

module.exports = {
  docsFolder,
  defaultRoot,
  webpackConfig,
  staticBuildDir,
  contentBase,
  index,
  serveStaticResources,
  port,
};
```



### docsFolder

- **type** : string
- **default value** : `__docs__`

The naming convention of the folders that contain your docs files.

### defaultRoot

- **type** : **absolute** path to a folder
- **default value** : `<absolute/path/to/project/root>/src`
- **example value** : `path.join(__dirname, 'documentation')`, `path.join(__dirname, 'src')`

The docs root folder, where Doks looks for docs folders. Overriden by specifying a folder / file path as CLI argument.

### webpackConfig

- **type** : Webpack config object
- **default value** : Doks internal default webpack config
- **example value** : `require('./webpack.config.js')`

The webpack config to be used for bundling your static documentation, and provided to the webpack dev server when starting doks in hot reload mode. 

### staticBuildDir

- **type** : **absolute** path to a folder
- **default value** : `<absolute/path/to/project/root>/docs`

The folder, in which Doks should output the generated static site when launching it build mode (`--build` CLI option). If the folder does not exist, Doks will create it.

`<absolute/path/to/project/root>/docs` allows to [serve the docs with gh-pages easily](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch). 

**HEADS UP :** This folder's contents will be **deleted** when Doks builds your static docs. 

### index

- **type** : **absolute** path to a (html) file
- **default value** : `Doks provides its own index.html`
- **example value** : `<absolute/path/to/project/root>/index.doks.html`

The default file that the dev server will serve. This allows you to customize the file, injecting your own scripts, stylesheets...

**HEADS UP :** This file **must** include some resources for Doks to work correctly. See the index.html at the root of Doks repository.

### serveStaticResources

- **type** : array of objects
- **default value** : `[]`

Array of static resources (files / folders) to serve in the webpack dev server (for example external scripts, stylesheets).

Objects in this array must have the following shape :

```javascript
{
  path: '/served/path', // path where the resource will be served
  resource: 'absolute/path/to/resource' // path to the resource on the filesystem
}
```

**Example :**

```javascript
// doks.config.js

serveStaticResources: [
  {
    path: '/stylesheets',
    resource: path.join(__dirname, 'static', 'stylesheets'),
  },
  {
    path: '/stylesheets',
    resource: '/path/to resource',
  },
]
```

### port

- **type** : number
- **default value** : 3003
- **example value** : 3333, 8080, ...

Port which the devserver will listen to.