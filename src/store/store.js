import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { user } from 'src/store/reducers/user';
import { contacts } from 'src/store/reducers/cotacts';

const reducers = combineReducers({
  user,
  contacts,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default (store);
