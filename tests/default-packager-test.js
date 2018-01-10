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

  //it('should return an application broccoli tree', co.wrap(function* () {
  //  let appInstance = {
  //    name: 'the-best-app-ever',
  //    _scriptOutputFiles: {},
  //    sourcemaps: {
  //      enabled: false
  //    },
  //    options: {
  //      outputPaths: {
  //        app: {
  //          js: '/assets/the-best-app-ever.js'
  //        },
  //        vendor: {
  //          js: '/assets/vendor.js'
  //        }
  //      }
  //    }
  //  };
  //  let applicationTree = yield createTempDir();

  //  applicationTree.write(APPLICATION_TREE);

  //  let packagedApplicationTree = defaultPackager(appInstance, applicationTree.path());

  //  const output = yield buildOutput(packagedApplicationTree);

  //  const outputInfo = output.read();

  //  expect(Object.keys(outputInfo)).to.deep.equal([PACKAGED_APPLICATION_TREE]);

  //  applicationTree.dispose();
  //}));
});
