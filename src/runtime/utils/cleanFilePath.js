/**
 * Clean a __docs__ file path to generate a nice name
 */
export default function(filePath) {
  const DOCS_FOLDER = DOCS_EXPLORER_REQUIRE_CONTEXT_DOCS_FOLDERS;

  const foldersArray = filePath.split('/');

  // Stripping extension :
  const filename = foldersArray[foldersArray.length - 1];
  const filenameWithoutExt = filename.slice(0, filename.lastIndexOf('.'));

  // Stripping index.js if necessary (or simply replace the filename without ext) :
  if (filenameWithoutExt === 'index') {
    foldersArray.pop();
  } else {
    foldersArray[foldersArray.length - 1] = filenameWithoutExt;
  }

  // Filter out __docs__, and ./ at the start :
  const cleanedFoldersArray = foldersArray.filter(name => {
    return (
      name !== DOCS_FOLDER
      && name !== '.'
    );
  });

  return cleanedFoldersArray.join('/');
}
