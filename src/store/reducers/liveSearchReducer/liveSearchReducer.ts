import {FilmType, setSearchError} from "../searchFilmsReducer/searchFilmsReducer";
import API, {source} from "../../../api/API";
import {AppThunk} from "../../store";

enum ACTIONS_TYPES {
    SET_LIVE_SEARCH_RESULT = 'LiveSearch/SET_LIVE_SEARCH_RESULT',
    SET_LIVE_IS_FETCHING_VALUE = 'LiveSearch/SET_LIVE_IS_FETCHING_VALUE',
    SET_LIVE_SEARCH_ERROR = 'LiveSearch/SET_LIVE_IS_FETCHING_VALUE',
    SET_EDIT_MODE = 'LiveSearch/SET_EDIT_MODE',
}

export const liveSearchInitialState = {
    liveSearchResult: [] as FilmType[],
    liveIsFetchingValue: false,
    liveSearchError: '',
    editMode: true,


}
export type LiveSearchInitialStateType = typeof liveSearchInitialState

export const liveSearchReducer = (state = liveSearchInitialState, action: ActionTypeLiveSearch): LiveSearchInitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.SET_LIVE_SEARCH_RESULT:
        case ACTIONS_TYPES.SET_LIVE_IS_FETCHING_VALUE:
        case ACTIONS_TYPES.SET_LIVE_SEARCH_ERROR:
        case ACTIONS_TYPES.SET_EDIT_MODE:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
export type ActionTypeLiveSearch =
    ReturnType<typeof setLiveSearchResult> |
    ReturnType<typeof setLiveIsFetchingValue> |
    ReturnType<typeof setLiveSearchError> |
    ReturnType<typeof setEditMode>


// A C T I O N  C R E A T O R S
export const setLiveSearchResult = (liveSearchResult: FilmType[]) => ({
    type: ACTIONS_TYPES.SET_LIVE_SEARCH_RESULT, payload: {liveSearchResult}
} as const)
export const setLiveIsFetchingValue = (liveIsFetchingValue: boolean) => ({
    type: ACTIONS_TYPES.SET_LIVE_IS_FETCHING_VALUE, payload: {liveIsFetchingValue}
} as const)
export const setLiveSearchError = (liveSearchError: string) => ({
    type: ACTIONS_TYPES.SET_LIVE_SEARCH_ERROR, payload: {liveSearchError}
} as const)
export const setEditMode = (editMode: boolean) => ({
    type: ACTIONS_TYPES.SET_EDIT_MODE, payload: {editMode}
} as const)

//T H U N K S

export const getFilmsInLiveSearch = (title: string): AppThunk => async (dispatch, getState) => {
    const {optionTypeValue} = getState().filmsSearch
    const {liveSearchError} = getState().liveSearch
    if (source) {
        source.cancel('Request was cancel')
    }
    dispatch(setEditMode(true))
    dispatch(setLiveIsFetchingValue(true));
    try {
        const {data} = await API.searchFilmsByTitle(title, optionTypeValue)
        const {Response, Search, Error, totalResults} = data
        dispatch(setLiveIsFetchingValue(false))
        if (Response === 'True') {
            dispatch(setLiveSearchResult(Search))
            liveSearchError && dispatch(setLiveSearchError(''))
        } else {
            dispatch(setLiveSearchError(Error))
            liveSearchError.length > 0 && dispatch(setLiveSearchResult([]))
        }
    } catch (error: any) {
        console.log(error)
        dispatch(setLiveIsFetchingValue(false))
        liveSearchError.length > 0 && dispatch(setLiveSearchResult([]))
        if (error.message) {
            dispatch(setSearchError(error.message))
        } else if (error.response.data) {
            dispatch(setSearchError(error.response.data.Error))
        }
    }
}


