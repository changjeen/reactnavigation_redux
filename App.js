import React from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import { createLogger} from "redux-logger";


import AppNavigator from './AppNavigator'
import MainReducer from './src/reducers/MainReducer'


const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  list: MainReducer,

});

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const logger = createLogger();


const store = createStore(
    appReducer,
    applyMiddleware(middleware,logger),
)

export default class Root extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
    );
  }
}
