'use strict';

const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');

const VENDOR_PREFIX_FILE_PATH = 'vendor/ember-cli/vendor-prefix.js';

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
  {
    'assets/vendor.js': [
      'vendor/ember-cli-shims/app-shims.js',
      'vendor/loader/loader.js',
      'vendor/ember-resolver/legacy-shims.js',
      ...
    ]
  }
  Produces an object that looks like:
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
    footerFiles: isMainVendorFile ? ['vendor/ember-cli/vendor-suffix.js'] : [],
  };
}

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

  let applicationJsOutputFilePath = appInstance.options.outputPaths.app.js;
  let vendorJsOutputFilePath = appInstance.options.outputPaths.vendor.js;

  appInstance._scriptOutputFiles[vendorJsOutputFilePath].unshift(VENDOR_PREFIX_FILE_PATH);

  let packagedApplicationJsTree = concat(inputTree, {
    inputFiles: [`${appInstance.name}/**/*.js`],
    headerFiles: [
      'vendor/ember-cli/app-prefix.js',
    ],
    footerFiles: [
      'vendor/ember-cli/app-suffix.js',
      'vendor/ember-cli/app-config.js',
      'vendor/ember-cli/app-boot.js',
    ],
    outputFile: applicationJsOutputFilePath,
    annotation: 'Concat App',
    sourceMapConfig: appInstance.sourcemaps
  });

  let importPaths = Object.keys(appInstance._scriptOutputFiles);

  let vendorTrees = importPaths.map(importPath => {
    let vendorObject = getVendorFiles(
      appInstance._scriptOutputFiles[importPath],
      importPath === DEFAULT_CONFIG.outputPaths.vendor.js
    );

    return concat(inputTree, {
      inputFiles: vendorObject.inputFiles,
      headerFiles: vendorObject.headerFiles,
      footerFiles: vendorObject.footerFiles,
      outputFile: importPath,
      annotation: 'Vendor JS',
      separator: '\n;',
      sourceMapConfig: appInstance.sourcemaps
    });
  });

  let packagedVendorJsTree;

  let trees = vendorTrees.concat(packagedApplicationJsTree);

  return mergeTrees(trees, {
    overwrite: true,
    annotation: 'Vendor & AppJs'
  });
};
