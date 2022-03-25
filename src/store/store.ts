import {ActionTypeSearchFilms, searchFilmsReducer} from "./reducers/searchFilmsReducer/searchFilmsReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {ThunkAction} from 'redux-thunk';
import {ActionTypeLiveSearch, liveSearchReducer} from "./reducers/liveSearchReducer/liveSearchReducer";

const rootReducer = combineReducers({
    filmsSearch:searchFilmsReducer,
    liveSearch:liveSearchReducer
})
export type AppActionsType =
    ActionTypeSearchFilms |
    ActionTypeLiveSearch
export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type GetStateType = typeof store.getState
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
    >

// @ts-ignore
window.store = store