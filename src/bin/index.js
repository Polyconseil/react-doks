/* eslint-disable global-require */
/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');

const doks = require('../index.js');

const DEFAULT_ROOT_FOLDER = path.join(process.cwd(), 'src');

let doksConfig;
try {
  doksConfig = require(path.join(process.cwd(), 'doks.config.js'));
} catch (err) {
  console.log('WARNING : No doks.config.js found. Falling back to default settings');
  console.log(err);
  doksConfig = {};
}

/**
 * Fetch doks.config.js config keys. When a conf key is not found, use a default one :
 */
const config = {
  docsFolder: doksConfig.docsFolder || '__docs__',
  defaultRoot: doksConfig.defaultRoot || DEFAULT_ROOT_FOLDER,
  webpackConfig: doksConfig.webpackConfig || require(path.join(__dirname, '../../webpack.config.default.js')),
  index: doksConfig.index || path.join(__dirname, '..', '..', 'index.html'),
  serveStaticResources: doksConfig.serveStaticResources || [],
  staticBuildDir: doksConfig.staticBuildDir || path.join(process.cwd(), 'docs'),
  port: doksConfig.port || 3003,
};


/** buildStatic :
 * Determines whether we build a static folder or we launch a WP dev server :
 */
const args = process.argv.slice(2); // Don't keep node path & CWD

const buildStaticArgIndex = args.findIndex(arg => arg === '--build');
const buildStatic = buildStaticArgIndex !== -1;

// Removing the "--build" arg if found :
if (buildStatic) args.splice(buildStaticArgIndex, 1);

config.buildStatic = buildStatic;


/** contextPath :
 * Decide the root path of the require.context that will be used in webpack to fetch docs files
 */
// Do we have a root folder specified via CLI ? (args was spliced from each argument we already used)
if (args.length) {
  const cwd = process.cwd();

  // Prepend CWD if given path isn't filesystem absolute :
  if ((args[0]).startsWith(path.separator)) {
    config.selectedPath = args[0];
  } else {
    config.selectedPath = path.join(cwd, args[0]);
  }
} else {
  // No args config : we check if the root specified in the conf file is a file or a folder :
  try {
    // Path found :
    const stats = fs.statSync(config.defaultRoot);
    if (stats.isFile()) {
      config.selectedPath = config.defaultRoot;
    }
  } catch (err) {
    // Path not found :
    console.warn('WARNING : ', config.contextPath, 'not found.\nUsing default root folder : ', config.defaultRoot);
    config.selectedPath = DEFAULT_ROOT_FOLDER;
  }
}

doks(config);
