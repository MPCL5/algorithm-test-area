import { compose, createStore } from "redux";
import reducers from "reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers /* undefined, */, composeEnhancers());
/* if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/index', () => {
    const nextRootReducer = require('../reducers/index');
    store.replaceReducer(nextRootReducer);
  });
} */

export default store;
