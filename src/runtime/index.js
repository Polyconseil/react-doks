/* eslint-disable global-require */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
// AppContainer is a necessary wrapper component for HMR

import cleanFilePath from './utils/cleanFilePath';

const path = require('path');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

/*
DOCS_EXPLORER_SINGLE_FILE will be replaced by a hard-coded boolean in the transpiled source, and webpack will not even read
the side that will not be executed. This allows us to require as few components as possible, and build a bundle as
small as possible :
*/
if (DOCS_EXPLORER_SINGLE_FILE) {
  const SingleDoc = require('./components/SingleDoc').default;
  // Requiring the single file, and rendering only this doc :
  const singleDoc = require(DOCS_EXPLORER_SELECTED_PATH);

  // Make relative from root of require context :
  const relativePath = path.relative(DOCS_EXPLORER_DEFAULT_ROOT, DOCS_EXPLORER_SELECTED_PATH);
  const name = cleanFilePath(relativePath);

  render(() => <SingleDoc name={name} doc={singleDoc} />);
  if (module.hot) {
    console.log('HOT Module Replacement enabled');
    module.hot.accept('./components/SingleDoc', () => {
      const NewSingleDoc = require('./components/SingleDoc').default;
      render(() => <NewSingleDoc name={name} doc={singleDoc} />);
    });
  }

} else {
  const Docs = require('./components/MultipleDocs').default;

  // Rendering a full docs page with a side panel :
  const requireDoc = require.context(DOCS_EXPLORER_SELECTED_PATH, true, DOCS_EXPLORER_REQUIRE_CONTEXT_REGEXP);
  render(() => <Docs context={requireDoc} />);
  if (module.hot) {
    console.log('HOT Module Replacement enabled');
    module.hot.accept('./components/MultipleDocs', () => {
      const NewMultipleDocs = require('./components/MultipleDocs').default;
      render(() => <NewMultipleDocs context={requireDoc} />);
    });
  }
}
