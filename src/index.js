import React from 'react';
import ReactDOM from 'react-dom';

/*
requireSingleFile will be replaced by a hard-coded boolean in the transpiled source, and webpack will not even read
the side that will not be executed. This allows us to require as few components as possible, and build a bundle as
small as possible :
*/
if (DOCS_EXPLORER_SINGLE_FILE) {
  const EcologyWrapper = require('./components/SingleDoc.js').default;
  // Requiring the single file, and rendering only this doc :
  const singleDoc = require(DOCS_EXPLORER_REQUIRE_CONTEXT_ROOT);

  ReactDOM.render(
    <EcologyWrapper doc={singleDoc} />,
    document.getElementById('root')
  );
} else {
  const Docs = require('./components/MultipleDocs').default;

  // Rendering a full docs page with a side panel :
  const requireDoc = require.context(DOCS_EXPLORER_REQUIRE_CONTEXT_ROOT, true, DOCS_EXPLORER_REQUIRE_CONTEXT_REGEXP);
  ReactDOM.render(<Docs context={requireDoc} />, document.getElementById('root'));
}
