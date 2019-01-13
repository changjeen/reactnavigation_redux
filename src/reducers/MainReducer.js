import {MAIN_LIST} from '../actions/ActionTypes';


export default (state = [], action={}) => {
  switch (action.type) {
      case MAIN_LIST:
          return action.payload || [];
      default:
          return state;
  }
};
