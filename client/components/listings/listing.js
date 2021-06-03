import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchListing} from '../../store/listings'

export default function Listing({match}) {
  const dispatch = useDispatch()
  const listing = useSelector(state => state.listings)

  console.log(listing)

  useEffect(() => {
    dispatch(fetchListing(match.params.listingId))
  }, [])

  return <div>hello listing</div>
}
