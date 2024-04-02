import { useEffect, useState } from 'react'
import RidesIndex from '../cmps/indexes/RidesIndex'
import { Ticket } from '../types/ticket-types'
import TicketIndex from '../cmps/indexes/TicketIndex'
import { FastRiderState } from '../types/ride-types'
import { LocalStorageKeys } from '../services/util-services'
import Loader from '../cmps/Loader'

const FastRider = () => {
  const [displayType, setDisplayType] = useState<
    null | FastRiderState.TICKET | FastRiderState.RIDES
  >(null)
  const [ticket, setTicket] = useState<null | Ticket>(null)

  useEffect(() => {
    checkAndRemoveExpiredTicket()
  }, [])

  const checkAndRemoveExpiredTicket = () => {
    const ticketString = localStorage.getItem(LocalStorageKeys.TICKET)
    if (!ticketString) {
      setDisplayType(FastRiderState.RIDES)
      return
    }

    const ticket = JSON.parse(ticketString)
    const returnTime = new Date(ticket.return_time).getTime()
    const currentTime = Date.now()

    if (currentTime >= returnTime) {
      localStorage.removeItem(LocalStorageKeys.TICKET)
      setDisplayType(FastRiderState.RIDES)
    } else {
      onSetTicket(ticket)
    }
  }

  const onSetTicket = (ticket: Ticket) => {
    setTicket(ticket)
    setDisplayType(FastRiderState.TICKET)
  }

  return (
    <section className="page-layout fast-rider">
      <div className="page-content">
        <h1 className="page-title">The Jungle™ FastRider Service</h1>

        {displayType ? (
          <>
            {displayType === FastRiderState.RIDES ? (
              <RidesIndex setTicket={onSetTicket} />
            ) : (
              <>{ticket ? <TicketIndex ticket={ticket} /> : <Loader />}</>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  )
}

export default FastRider
