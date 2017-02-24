
module.exports = {

  Components: makeFileTree(require('../app/js/components/**/*.js',  {mode: 'hash'})),
  Config: makeFileTree(require('../app/js/config/**/*.js',  {mode: 'hash'})),
  Controllers: makeFileTree(require('../app/js/controllers/**/*.js',  {mode: 'hash'})),
  Modules: makeFileTree(require('../app/js/modules/**/*.js',  {mode: 'hash'})),
  Pages: makeFileTree(require('../app/js/pages/**/*.js',  {mode: 'hash'}))

};

function makeFileTree(files) {

  var fileTree = {};

  var file_paths = Object.keys(files);

  function addFileToTree(path, i, tree, previous_tree) {

    var current_path = path[i];

    if (i === path.length - 1) {

      var contents = files[path.join('/')]; // module.exports

      if (current_path === 'index') {
        if (typeof contents === 'object') tree = Object.assign(tree, contents);
        else previous_tree[path[i-1]] = contents;
      } else {
        tree[current_path] = contents;
      }

      return;

    }

    // if we are on the first part of the path, and the current_path contains the word 'pages', then we are skipping it since it is just a grouped page folder like 'profile-pages' or 'entry-pages'
    else if (i === 0 && current_path.includes('pages')) {

      i++;
      addFileToTree(path, i, tree);

    } else {

      if (!tree[current_path]) tree[current_path] = {};
      i++;
      addFileToTree(path, i, tree[current_path], tree);

    }

  }

  file_paths.forEach(function parseFilePath(filePath) {

    var fileLocation = filePath.split('/');

    // If file is in root directory, eg 'index.js'
    if (fileLocation.length === 1) return (fileTree[fileLocation[0]] = files[filePath]);

    addFileToTree(fileLocation, 0, fileTree);

  });

  return fileTree;

}
