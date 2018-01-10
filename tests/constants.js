const APPLICATION_TREE = {
  'addon-tree-output': {
    'ember-ajax': {
      'request.js': '!',
    },
    'ember-cli-app-version': {
      'initializer-factory.js': '!',
    },
    'modules': {
      'ember-data': {
        'transform.js': '!',
        'store.js': '!',
      },
    },
  },
  'the-best-app-ever': {
    'router.js': 'THIS',
    'app.js': 'IS',
    'components': {
      'x-foo.js': 'MADNESS!',
    },
    'config': {
      'environment.js': 'NO!',
    },
  },
  'vendor': {
    'loader': {
      'loader.js': 'W',
    },
    'ember': {
      'jquery': {
        'jquery.js': 'O',
      },
      'ember.debug.js': 'R',
    },
    'ember-cli': {
      'app-boot.js': '!!!',
      'app-config.js': 'SPARTA',
      'app-prefix.js': 'THIS',
      'app-suffix.js': 'IS',
      'test-support-prefix.js': 'If a clod be washed away by the sea,',
      'test-support-suffix.js': 'Europe is the less.',
      'tests-prefix.js': 'As well as if a promontory were.',
      'tests-suffix.js': 'As well as if a manor of thine own',
      'vendor-prefix.js': 'HELLO',
      'vendor-suffix.js': '!',
    },
    'ember-cli-shims': {
      'app-shims.js': 'L',
    },
    'ember-resolver': {
      'legacy-shims.js': 'D',
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
