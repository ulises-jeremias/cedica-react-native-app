import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'

import reducer from './reducer'

const packages = []
const enhancers = []

// Push middleware that you need for both development and production
packages.push(thunk)

const middleware = applyMiddleware(...packages)

let store

if (__DEV__) {
  store = createStore(
    reducer,
    composeWithDevTools(...enhancers, middleware),
  )
} else {
  store = createStore(
    reducer,
    ...enhancers,
    middleware,
  )
}

export default store