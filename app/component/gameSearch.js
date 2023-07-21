import { apiInstance } from '../../apis/setting'
import { queryKeys } from '../constants';
import { useInfiniteQuery } from "react-query";

export const getGameSearch = (search, searchPage) => axios.get(`/search/movie`, {
    params: {
        search: search,
        searchPage: searchPage
    },
    withCredentials: true
})

const useGetGameSearch = (search) => {
    const queryFn = async (search, searchPage) => {
        const response = await getGameSearch(search, searchPage)
        const { data } = response
        return { data, searchPage: searchPage }
    }

    return useInfiniteQuery(['gameSearch', (search)], ({ pageParam = 1 }) => queryFn(search, pageParam), {
        getNextPageParam: (lastPage) => lastPage.searchPage + 1 || undefined
    })
}

export default useGetGameSearch