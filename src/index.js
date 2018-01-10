'use strict';

const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');

const APP_BOOT_FILE_PATH = 'vendor/ember-cli/app-boot.js';
const APP_PREFIX_FILE_PATH = 'vendor/ember-cli/app-prefix.js';
const APP_SUFFIX_FILE_PATH = 'vendor/ember-cli/app-suffix.js';
const APP_CONFIG_FILE_PATH = 'vendor/ember-cli/app-config.js';
const VENDOR_PREFIX_FILE_PATH = 'vendor/ember-cli/vendor-prefix.js';
const VENDOR_SUFFIX_FILE_PATH = 'vendor/ember-cli/vendor-suffix.js';

let DEFAULT_CONFIG = {
  storeConfigInMeta: true,
  autoRun: true,
  outputPaths: {
    app: {
      html: 'index.html',
    },
    tests: {
      js: '/assets/tests.js',
    },
    vendor: {
      css: '/assets/vendor.css',
      js: '/assets/vendor.js',
    },
    testSupport: {
      css: '/assets/test-support.css',
      js: {
        testSupport: '/assets/test-support.js',
        testLoader: '/assets/test-loader.js',
      },
    },
  },
  minifyCSS: {
    options: { relativeTo: 'assets' },
  },
  sourcemaps: {},
  trees: {},
  jshintrc: {},
  addons: {},
};

function isBroccoliTree(tree) {
  return typeof tree.rebuild === 'function' || tree._inputNodes != undefined;
}

/*
  Creates an object with lists of files to be concatenated into `vendor.js` file.

  Given a map that looks like:

  ```
  {
    'assets/vendor.js': [
      'vendor/ember-cli-shims/app-shims.js',
      'vendor/loader/loader.js',
      'vendor/ember-resolver/legacy-shims.js',
      ...
    ]
  }
  ```

  Produces an object that looks like:

  ```
  {
    headerFiles: [
     'vendor/ember-cli/vendor-prefix.js',
     'vendor/loader/loader.js',
     'vendor/ember/jquery/jquery.js',
     'vendor/ember/ember.debug.js',
     'vendor/ember-cli-shims/app-shims.js',
     'vendor/ember-resolver/legacy-shims.js'
    ],
    inputFiles: [
      'addon-tree-output/**\/*.js'
    ],
    footerFiles: [
      'vendor/ember-cli/vendor-suffix.js'
    ],
    annotation: 'Vendor JS'
  }
  ```

  @private
  @method getVendorFiles
  @param {Object} files A list of files to include into `<file-name>.js`
  @param {Boolean} isMainVendorFile Boolean flag to indicate if we are dealing with `vendor.js` file
  @return {Object} An object with lists of files to be concatenated into `vendor.js` file.
 */
function getVendorFiles(files, isMainVendorFile) {
  return {
    headerFiles: files,
    inputFiles: isMainVendorFile ? ['addon-tree-output/**/*.js'] : [],
    footerFiles: isMainVendorFile ? [VENDOR_SUFFIX_FILE_PATH] : [],
  };
}

/*
  Concatenates all application's javascript Broccoli trees into one, as follows:

  Given an input tree that looks like:

  ```
  addon-tree-output/
    ember-ajax/
    ember-data/
    ember-engines/
    ember-resolver/
    ...
  bower_components/
    usertiming/
    sinonjs/
    ...
  the-best-app-ever/
    components/
    config/
    helpers/
    routes/
    ...
  vendor/
    ...
    babel-core/
    ...
    broccoli-concat/
    ...
    ember-cli-template-lint/
    ...
  ```

  Produces a tree that looks like:

  ```
  assets/
    the-best-app-ever.js
    the-best-app-ever.map (if sourcemaps are enabled)
  ```

  @method packageApplicationJs
  @param {BroccoliTree} EmberApp broccoli tree
  @param {Object} options
  @return {BroccoliTree} Final Broccoli tree with application files.
 */
function packageApplicationJs(tree, options) {
  return concat(tree, {
    inputFiles: [`${options.name}/**/*.js`],
    headerFiles: [
      APP_PREFIX_FILE_PATH
    ],
    footerFiles: [
      APP_SUFFIX_FILE_PATH,
      APP_CONFIG_FILE_PATH,
      APP_BOOT_FILE_PATH
    ],
    outputFile: options.outputFile,
    annotation: 'Concat App',
    sourceMapConfig: options.sourcemaps
  });
}

/*
  Concatenates all vendor's javascript Broccoli trees into one, as follows:

  Given an input tree that looks like:

  ```
  addon-tree-output/
    ember-ajax/
    ember-data/
    ember-engines/
    ember-resolver/
    ...
  bower_components/
    usertiming/
    sinonjs/
    ...
  the-best-app-ever/
    components/
    config/
    helpers/
    routes/
    ...
  vendor/
    ...
    babel-core/
    ...
    broccoli-concat/
    ...
    ember-cli-template-lint/
    ...
  ```

  Produces a tree that looks like:

  ```
  assets/
    vendor.js
    vendor.map (if sourcemaps are enabled)
  ```

  @method packageVendorJs
  @param {BroccoliTree} EmberApp broccoli tree
  @param {Object} options
  @return {BroccoliTree} Final Broccoli tree with vendor files.
 */
function packageVendorJs(tree, options) {
  let importPaths = Object.keys(options.outputFilesMap);

  let packagedVendorJsTrees = importPaths.map(importPath => {
    let vendorObject = getVendorFiles(
      options.outputFilesMap[importPath],
      importPath === DEFAULT_CONFIG.outputPaths.vendor.js
    );

    return concat(tree, {
      inputFiles: vendorObject.inputFiles,
      headerFiles: vendorObject.headerFiles,
      footerFiles: vendorObject.footerFiles,
      outputFile: importPath,
      annotation: 'Vendor JS',
      separator: '\n;',
      sourceMapConfig: options.sourcemaps
    });
  });

  return mergeTrees(packagedVendorJsTrees, {
    annotation: 'Concat Vendor JS'
  });
}

function prependVendorPrefixFileToVendorJs(map, path) {
  map[path].unshift(VENDOR_PREFIX_FILE_PATH);
}

/*
  Concatenates all application's javascript and vendor Broccoli trees into one, as follows:

  Given an input tree that looks like:

  ```
  addon-tree-output/
    ember-ajax/
    ember-data/
    ember-engines/
    ember-resolver/
    ...
  bower_components/
    usertiming/
    sinonjs/
    ...
  the-best-app-ever/
    components/
    config/
    helpers/
    routes/
    ...
  vendor/
    ...
    babel-core/
    ...
    broccoli-concat/
    ...
    ember-cli-template-lint/
    ...
  ```

  Produces a tree that looks like:

  ```
  assets/
    the-best-app-ever.js
    the-best-app-ever.map (if sourcemaps are enabled)
    vendor.js
    vendor.map (if sourcemaps are enabled)
  ```

  @method defaultPackager
  @param {Object} EmberApp instance
  @param {BroccoliTree} EmberApp broccoli tree
  @return {BroccoliTree} Final Broccoli tree with application and vendor files.
 */
module.exports = function defaultPackager(appInstance, inputTree) {
  if (appInstance === undefined) {
    throw new Error('You must pass an application instance as an argument.');
  }

  if (inputTree === undefined) {
    throw new Error('You must pass an application broccoli tree as an argument.');
  }

  //if (!isBroccoliTree(inputTree)) {
  //  throw new Error('You must pass a broccoli tree as an argument.');
  //}

  prependVendorPrefixFileToVendorJs(
    appInstance._scriptOutputFiles,
    appInstance.options.outputPaths.vendor.js
  );

  let packagedApplicationJsTree = packageApplicationJs(inputTree, {
    name: appInstance.name,
    outputFile: appInstance.options.outputPaths.app.js,
    sourcemaps: appInstance.sourcemaps
  });

  let packagedVendorJsTree = packageVendorJs(inputTree, {
    outputFilesMap: appInstance._scriptOutputFiles,
    sourcemaps: appInstance.sourcemaps
  });

  return mergeTrees([
    packagedApplicationJsTree,
    packagedVendorJsTree
  ], {
    overwrite: true,
    annotation: 'Vendor & AppJS'
  });
};
