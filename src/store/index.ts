import {
  configureStore,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit'
import counterReducer from 'src/store/slices/counter'
import { pokemonApi } from 'src/services'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = combineReducers({
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  })

const store = setupStore()

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
