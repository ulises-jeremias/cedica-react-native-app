import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const packages = []
const enhancers = []

// Push middleware that you need for both development and production
packages.push(thunk)

const middleware = applyMiddleware(...packages)

const store = createStore(
  reducer,
  ...enhancers,
  middleware,
)

export default store