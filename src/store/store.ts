import {ActionTypeSearchFilms, searchFilmsReducer} from "./reducers/searchFilmsReducer/searchFilmsReducer";
import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {ActionTypeLiveSearch, liveSearchReducer} from "./reducers/liveSearchReducer/liveSearchReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const rootReducer = combineReducers({
    filmsSearch: searchFilmsReducer,
    liveSearch: liveSearchReducer
})
export type AppActionsType =
    ActionTypeSearchFilms |
    ActionTypeLiveSearch
export type AppStateType = ReturnType<typeof rootReducer>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store: Store<RootStoreType> = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export type RootStoreType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>

// @ts-ignore
window.store = store