import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchEvents} from '../../store/event'

export default function Events() {
  const dispatch = useDispatch()
  const allEvents = useSelector(state => state.event)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <>
      {allEvents && allEvents.length ? (
        allEvents.map(event => <div key={event.id}>{event.location}</div>)
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
