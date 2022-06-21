import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import {rootReducer} from './rootReducers';

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
));