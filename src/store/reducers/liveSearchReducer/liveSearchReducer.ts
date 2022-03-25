import {FilmType} from "../searchFilmsReducer/searchFilmsReducer";

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
    editMode:true,


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


