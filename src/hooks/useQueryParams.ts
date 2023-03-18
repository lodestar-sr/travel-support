import { QueryParams } from './../interface/index';
import { useState, useEffect } from 'react'
import { queryObjSerialize } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';


export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>()
  const [queryString, setQuerySring] = useState('')
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    const newQueryString = queryObjSerialize({
      ...queryParams
    })
    setQuerySring(newQueryString)
  }, [JSON.stringify(queryParams)]);

  useEffect(() => {
    if (queryString)
      navigate(`${location.pathname}?${queryString}`)
  }, [queryString]);

  return {
    queryParams,
    setQueryParams,
    queryString
  }

}