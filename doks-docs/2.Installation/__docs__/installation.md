# Installation

## You know the drill

In your project :

`npm install react-doks`

or globally :

`npm install -g react-doks`

## Seting up :

### Configuration file

Create a doks.config.js **at the root of your project folder**. It should export a single JS object. All keys are optional, and Doks will fallback to a default value if a key is not specified.

For more information on this part, see [Configuration](#3.Configuration). 

## Start Doks

### Devserver / static :

Doks has two main working modes :
- hot reload dev server
- static docs explorer generation

Start Doks in hot reload mode : 

`doks`

Start Doks in "build" mode :
 
`doks --build`

### Folder restriction :

Additionnaly, you can provide :
 
- a specific folder in which Doks should look for documentation, or a single file :  
`doks src/components/MySuperDuperComponent`
- a single file to load (this will load Doks without its side menu) :  
`doks src/components/MySuperDuperComponent/__docs__/aSingleDocsFile.js`
