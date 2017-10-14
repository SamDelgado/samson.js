
/*
const modulesDirectory = require.context('../../../../app/js/modules', true, /\.js$/);
const pagesDirectory = require.context('../../../../app/js/pages', true, /\.js$/);
//requireTest.keys().forEach(requireTest);

console.log(modulesDirectory.keys());
console.log(pagesDirectory.keys());
*/

const PagesDirectory = (ctx => {
  let keys = ctx.keys();
  let values = keys.map(ctx);
  return keys.reduce((o, k, i) => { o[k] = values[i]; return o; }, {});
})(require.context('../../../../app/js/pages', true, /\.js$/));

console.log(PagesDirectory);

/*
function buildPages() {

  var Pages = {};

  pagesDirectory.keys().forEach(function(file_name) {



  });

  return Pages;

}
*/

/*
function createSamsonAppBundle() {
  
  return {
    
    Components: loadDirectory('components'), // makeFileTree(loadDirectory('components'))
    Config: loadDirectory('config'),
    Controllers: loadDirectory('controllers'),
    Setup: loadDirectory('setup'),
    Modules: loadDirectory('modules'),
    Pages: loadDirectory('pages')
  
  };
  
}
*/

function loadDirectory(directory) {
  
  //return directory_tree;

}

export const SamsonAppBundle = {
  name: 'SamsonAppBundle'
};

function makeFileTree(files) {

  var filetree = {};

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
