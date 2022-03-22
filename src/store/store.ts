import {ActionTypeSearchFilms, searchFilmsReducer} from "./reducers/searchFilmsReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {ThunkAction} from 'redux-thunk';

const rootReducer = combineReducers({
    filmsSearch:searchFilmsReducer
})
export type AppActionsType =
    ActionTypeSearchFilms
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