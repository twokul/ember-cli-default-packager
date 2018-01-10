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
      'app-boot.js': 'app-boot.js',
      'app-config.js': 'app-config.js',
      'app-prefix.js': 'app-prefix.js',
      'app-suffix.js': 'app-suffix.js',
      'test-support-prefix.js': 'test-support-prefix.js',
      'test-support-suffix.js': 'test-support-suffix.js',
      'tests-prefix.js': 'tests-prefix.js',
      'tests-suffix.js': 'tests-suffix.js',
      'vendor-prefix.js': 'vendor-prefix.js',
      'vendor-suffix.js': 'vendor-suffix.js',
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
