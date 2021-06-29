import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchEvents} from '../../store/events'

export default function Events() {
  const dispatch = useDispatch()
  const allEvents = useSelector(state => state.events.events)

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
