'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformations = [];
  const midState = { ...state };
  let index = 0;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        midState[key] = action.extraData[key];
      }
      transformations[index] = { ...midState };
      index++;
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete midState[key];
      }
      transformations[index] = { ...midState };
      index++;
    } else if (action.type === 'clear') {
      for (const key in midState) {
        delete midState[key];
      }
      transformations[index] = { ...midState };
      index++;
    }
  }

  return transformations;
}

module.exports = transformStateWithClones;
