
/*

  The exported SamsonAppBundle object tells Samson about our App's:

  - Name
  - Top-level Components
  - Controllers
  - Modules/Plugins
  - Pages
  - Router defaults and event methods

*/

const SamsonAppBundle = makeModuleTree(require.context('src', true, /^((?![\\/]assets|styles[\\/]).)*\.[a-z]+$/)); // we will bundle the SamsonApp by geting all .js and template files within the src/ folder

SamsonAppBundle.Name = APP_NAME;
SamsonAppBundle.DEBUG = DEBUG;

module.exports = SamsonAppBundle;

function makeModuleTree (ctx) {
  function capitalizeFirstLetter (string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  const exclusions = ['assets', 'styles', 'index.html', 'index.js', 'index', ''];
  const style_extensions = ['.css', '.scss', '.sass', '.less'];

  const ModuleTree = {};

  const context_files = ctx.keys();

  context_files.forEach(function (key) {
    // Check the file path to see if it should be excluded
    const filePath = key.substring(2); // remove the ./ from each filePath
    const segments = filePath.split('/'); // split the filePath 'pages/home/home.js' into ['pages', 'home', 'home.js']

    // make sure the file doesn't start with something excluded
    if (exclusions.includes(segments[0])) return;

    // if the file ends with a 'style_extension' then immediately require the module
    var is_style_module = false;
    style_extensions.forEach(function (style_ext) {
      if (filePath.endsWith(style_ext)) is_style_module = true;
    });

    if (is_style_module) {
      ctx(key);
      return;
    }

    // require the module and load it into the 'module' variable
    var module = ctx(key);

    // Babel hack, required to get ES5 and ES6 to place nice together
    // by extracting the module from .default per Babel 6 behavior
    if (module.default && module.__esModule) module = module.default;

    // determine if the module is a Component or Page
    const module_type = segments[0] = capitalizeFirstLetter(segments[0]);

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

  if (i === pathSegments.length - 1) {
    // get the file name without the extension
    var module_name = current_path_segment.split('.')[0];
    var parent_name = pathSegments[i - 1];

    if (current_path_segment === 'index.js') {
      if (typeof module === 'object') tree = Object.assign(tree, module);
      else previousTree[parent_name] = module;
    } else {
      tree[module_name] = module;
    }
  } else {
    if (!tree[current_path_segment]) tree[current_path_segment] = {};
    i++;
    addModuleToTree(module, pathSegments, i, tree[current_path_segment], tree);
  }
}

function addComponentToTree (module, pathSegments, i, tree, previousTree) {
  var current_path_segment = pathSegments[i];

  if (i === pathSegments.length - 1) {
      // split the file name and extension
    var segment_split = current_path_segment.split('.');
    var module_name = segment_split[0];
    var module_ext = segment_split[1];
    var parent_name = pathSegments[i - 1];

    if (module_name.toUpperCase() === parent_name.toUpperCase() && module_ext === 'js') {
      if (typeof module === 'object') tree = Object.assign(tree, module);
      else previousTree[parent_name] = module;
    } else if (module_name.toUpperCase() === parent_name.toUpperCase() && module_ext === TEMPLATE_ENGINE) {
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
    if (!tree[current_path_segment]) tree[current_path_segment] = {};
    i++;
    addComponentToTree(module, pathSegments, i, tree[current_path_segment], tree);
  }
}
