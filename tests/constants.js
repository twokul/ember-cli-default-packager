const APPLICATION_TREE = {
  'addon-tree-output': {
    'ember-ajax': {
      'request.js': '',
    },
    'ember-cli-app-version': {
      'initializer-factory.js': '',
    },
    'modules': {
      'ember-data': {
        'transform.js': '',
        'store.js': '',
      },
    },
  },
  'the-best-app-ever': {
    'router.js': 'router.js',
    'app.js': 'app.js',
    'components': {
      'x-foo.js': 'x-foo.js',
    },
    'config': {
      'environment.js': 'environment.js',
    },
  },
  'vendor': {
    'loader': {
      'loader.js': '',
    },
    'ember': {
      'jquery': {
        'jquery.js': '',
      },
      'ember.debug.js': '',
    },
    'ember-cli': {
      'app-boot.js': 'No man is an island,',
      'app-config.js': 'Entire of itself.',
      'app-prefix.js': 'Each is a piece of the continent,',
      'app-suffix.js': 'A part of the main.',
      'test-support-prefix.js': 'If a clod be washed away by the sea,',
      'test-support-suffix.js': 'Europe is the less.',
      'tests-prefix.js': 'As well as if a promontory were.',
      'tests-suffix.js': 'As well as if a manor of thine own',
      'vendor-prefix.js': 'Or of thine friend\'s were.',
      'vendor-suffix.js': 'Each man\'s death diminishes me,',
    },
    'ember-cli-shims': {
      'app-shims.js': '',
    },
    'ember-resolver': {
      'legacy-shims.js': '',
    },
  },
};

const PACKAGED_APPLICATION_TREE = {
  'the-best-app-ever.css': '',
  'vendor.css': '',
  'the-best-app-ever.js': '',
  'vendor.js': ''
};

module.exports = { APPLICATION_TREE, PACKAGED_APPLICATION_TREE };
