/* eslint-disable global-require */
/* eslint-disable no-console */

const path = require('path');

const doks = require('../index.js');

let doksConfig;
try {
  doksConfig = require(path.join(process.cwd(), 'doks.config.js'));
} catch (err) {
  console.log('No doks.config.js found. Falling back to default settings');
  doksConfig = {};
}

/**
 * Fetch doks.config.js config keys, or use our sensible defaults :
 */
const config = {
  docsFolder: doksConfig.docsFolder || '__docs__',
  defaultRoot: doksConfig.defaultRoot || path.join(process.cwd(), 'src'),
  webpackConfig: doksConfig.webpackConfig || require(path.join(__dirname, '../../webpack.config.default.js')),
  index: doksConfig.index || 'index.html',
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
}

doks(config);
