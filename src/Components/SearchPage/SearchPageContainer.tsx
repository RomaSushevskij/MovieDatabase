import React from 'react'
import {SearchPage} from "./SearchPage";
import {AppStateType} from "../../store/store";
import {useSelector} from "react-redux";

export const SearchPageContainer = () => {
    const {
        searchResult,
        searchError,
        isFetching,
    } = useSelector((state: AppStateType) => state.filmsSearch)
    return <SearchPage searchResult={searchResult}
                       searchError={searchError}
                       isFetching={isFetching}/>
}