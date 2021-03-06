# react-doks

React static documentation generator, aimed at merging the development and the documentation workflow.

- Load the component you're working on, develop in isolation, enjoy hot reload
- Generate static docs and serve them with Github pages (or your own server)
- Markdown documentation with interactive code examples
- Automatic props table

## What is it ?

This tool picks every folder following a certain naming convention (by default, `__docs__`) in a given folder's subtree, and loads every `*.js` file it finds in those folders. Then, it bundles an explorer that allows to browse the docs, with a hot-reload feature when in dev mode to allow developping interactive docs. 

## [See it in action](https://polyconseil.github.io/react-doks)

[See an example demo component](https://polyconseil.github.io/react-doks/#Demo/components/WonderfulComponent)

## How to use

### Devserver or static build

Doks has two main working modes :
- hot reload dev server
- static docs explorer generation

Start Doks in hot reload mode : 

`doks`

Start Doks in "build" mode :
 
`doks --build`

### Folder restriction :

Additionally, you can provide :
 
- a specific folder in which Doks should look for documentation, or a single file :  
`doks src/components/MySuperDuperComponent`
- a single file to load (this will load Doks without its side menu) :  
`doks src/components/MySuperDuperComponent/__docs__/aSingleDocsFile.js`
