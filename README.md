# react-doks

React static documentation generator, aimed at merging the development and the documentation workflow.

- Load the component you're working on, develop in isolation, enjoy hot reload
- Generate static docs and serve them with Github pages (or your own server)
- Markdown documentation with interactive code examples
- Automatic props table

## Philosophy

This tool picks every folder following a certain naming convention (say `__docs__`) in a given folder's subtree, and loads every `*.js` file it finds in there in an explorer.

## [See it in action](#todo)

(coming soon)

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
