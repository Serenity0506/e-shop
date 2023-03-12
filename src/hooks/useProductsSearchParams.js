import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import {
  changeSearchFilter,
  getSearchSelector,
} from '../components/redux/slices/filterSlice'

export const useProductsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchFilter = useSelector(getSearchSelector)
  const dispatch = useDispatch()

  const productsSearchParams = useMemo(
    () => ({
      sort: searchParams.get('sort') || '',
      order: searchParams.get('order') || '',
      search: searchParams.get('search') || '',
    }),
    [searchParams]
  )

  const [prevUrlSearch, setPrevUrlSearch] = useState('')
  const [prevInputSearch, setPrevInputSearch] = useState(searchFilter)

  const setProductsSearchParams = useCallback(
    (newState) => {
      const clearState = Object.entries({
        ...productsSearchParams,
        ...newState,
      }).reduce((clear, [key, value]) => {
        return !!value ? { ...clear, [key]: value } : clear
      }, {})

      setSearchParams(clearState)
    },
    [setSearchParams, productsSearchParams]
  )

  useEffect(() => {
    if (searchFilter !== prevInputSearch) {
      setProductsSearchParams({ search: searchFilter })
      setPrevInputSearch(searchFilter)
      setPrevUrlSearch(searchFilter)
    } else if (productsSearchParams.search !== prevUrlSearch) {
      dispatch(changeSearchFilter(productsSearchParams.search))
      setPrevInputSearch(productsSearchParams.search)
      setPrevUrlSearch(productsSearchParams.search)
    } else {
      setProductsSearchParams({ search: searchFilter })
    }
  }, [dispatch, prevInputSearch, prevUrlSearch, searchFilter, productsSearchParams.search, setProductsSearchParams])

  return [productsSearchParams, setProductsSearchParams]
}
