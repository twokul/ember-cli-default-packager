'use strict';

const co = require('co');
const chai = require('chai');
const helper = require('broccoli-test-helper');
const constants = require('./constants');
const defaultPackager = require('../src/index');

const expect = chai.expect;
const buildOutput = helper.buildOutput;
const createTempDir = helper.createTempDir;
const APPLICATION_TREE = constants.APPLICATION_TREE;
const PACKAGED_APPLICATION_TREE = constants.PACKAGED_APPLICATION_TREE;

describe('Default Packager', function() {
  it('should throw if an instance of Ember Application is not passed in', function() {
    expect(() => {
      defaultPackager();
    }).to.throw('You must pass an application instance as an argument.');
  });

  it('should throw if an application broccoli tree is not passed in', function() {
    let appInstance = {};

    expect(() => {
      defaultPackager(appInstance);
    }).to.throw('You must pass an application broccoli tree as an argument.');
  });

  //it('should throw if not a broccoli tree is passed in', function() {
  //  let appInstance = {};

  //  expect(() => {
  //    defaultPackager(appInstance, {});
  //  }).to.throw('You must pass a broccoli tree as an argument.');
  //});

  it('should return an application broccoli tree', co.wrap(function* () {
    let appInstance = {
      name: 'the-best-app-ever',
      _scriptOutputFiles: {
        '/assets/vendor.js': [
          'vendor/loader/loader.js',
          'vendor/ember/jquery/jquery.js',
          'vendor/ember/ember.debug.js',
          'vendor/ember-cli-shims/deprecations.js',
          'vendor/ember-cli-shims/app-shims.js',
          'vendor/ember-resolver/legacy-shims.js'
        ]
      },
      sourcemaps: {
        enabled: false
      },
      options: {
        outputPaths: {
          app: {
            js: '/assets/the-best-app-ever.js'
          },
          vendor: {
            js: '/assets/vendor.js'
          }
        }
      }
    };
    let applicationTree = yield createTempDir();

    applicationTree.write(APPLICATION_TREE);

    let packagedApplicationTree = defaultPackager(appInstance, applicationTree.path());

    const output = yield buildOutput(packagedApplicationTree);

    const outputInfo = output.read();

    expect(outputInfo.assets).to.deep.equal({
      'the-best-app-ever.js': 'THIS\nIS\nMADNESS!\nNO!\nTHIS\nIS\nSPARTA\n!!!',
      'vendor.js': 'HELLO\n;W\n;O\n;R\n;L\n;D\n;!\n;!\n;!\n;!\n;!'
    });

    applicationTree.dispose();
  }));
});
