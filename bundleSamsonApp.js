
/*

  The exported SamsonAppBundle object tells Samson about our App's:

  - Name
  - Top-level Components
  - Controllers
  - Modules/Plugins
  - Pages
  - Router defaults and event methods

*/

const SamsonAppBundle = makeModuleTree(require.context('app', true, /\.(js|pug)$/)); // we will bundle the SamsonApp by geting all .js and .pug files within the src/ folder
SamsonAppBundle.Name = APP_NAME;
SamsonAppBundle.DEBUG = DEBUG;

module.exports = SamsonAppBundle;

function makeModuleTree (ctx) {
  function capitalizeFirstLetter (string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  const exclusions = ['Index.js', 'Assets', 'Styles'];

  const ModuleTree = {};

  ctx.keys().forEach(function (key) {
    let module = ctx(key);

    // Babel hack, required to get ES5 and ES6 to place nice together
    // by extracting the module from .default per Babel 6 behavior
    if (module.default && module.__esModule) module = module.default;

    const segments = key.split('/'); // break the key './dir1/dir2/file.js' into ['.', 'dir1', 'dir2', 'file.js']
    segments.splice(0, 1); // remove the relative path field segment

    // determine if the module is a Component or Page
    const module_type = segments[0] = capitalizeFirstLetter(segments[0]);

    // check if the module should be excluded
    if (exclusions.includes(module_type)) return;

    if (module_type === 'Components' || module_type === 'Pages') {
      // this is a special Samson module (a Component or Page)
      addComponentToTree(module, segments, 0, ModuleTree);
    } else {
      // this is a normal module
      addModuleToTree(module, segments, 0, ModuleTree);
    }
  });

  return ModuleTree;
}

function addModuleToTree (module, pathSegments, i, tree, previousTree) {
  var current_path_segment = pathSegments[i];

  // split the file name and extension
  var segment_split = current_path_segment.split('.');
  var module_name = segment_split[0];
  var module_ext = segment_split[1];

  if (i === pathSegments.length - 1) {
    if (current_path_segment === 'index.js') {
      if (typeof module === 'object') tree = Object.assign(tree, module);
      else previousTree[pathSegments[i - 1]] = module;
    } else {
      tree[module_name] = module;
    }

    return;
  } else {
    if (!tree[module_name]) tree[module_name] = {};
    i++;
    addModuleToTree(module, pathSegments, i, tree[current_path_segment], tree);
  }
}

function addComponentToTree(module, pathSegments, i, tree, previousTree) {

  var current_path_segment = pathSegments[i];

  // split the file name and extension
  var segment_split = current_path_segment.split('.');
  var module_name = segment_split[0];
  var module_ext = segment_split[1];

  if (i === pathSegments.length - 1) {

    var parent_name = pathSegments[i-1];

    if (module_name.toUpperCase() === parent_name.toUpperCase() && module_ext === 'js') {

      if (typeof module === 'object') tree = Object.assign(tree, module);
      else previousTree[parent_name] = module;

    } else if (module_name.toUpperCase() === parent_name.toUpperCase() && module_ext === 'pug') {

      tree.template = module;

    } else {

      tree[module_name] = module;
      
    }

    

  // if we are on the first part of the path, and the current_path contains the word 'pages',
  // then we are skipping it since it is just a grouped page folder like 'profile-pages' or 'misc-pages'
  } else if (i === 1 && current_path_segment.includes('pages')) {
    
      i++;
      addComponentToTree(module, pathSegments, i, tree);
    
  } else {

    if (!tree[module_name]) tree[module_name] = {};
    i++;
    addComponentToTree(module, pathSegments, i, tree[current_path_segment], tree);

  }

}
