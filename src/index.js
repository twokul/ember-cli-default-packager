'use strict';

function isBroccoliTree(tree) {
  return typeof tree.rebuild === 'function' || tree._inputNodes != undefined;
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

  return inputTree;
};
