import { useEffect, useState } from 'react'
import RidesIndex from './RidesIndex'
import { Ticket } from '../types/ticket-types'
import TicketIndex from './TicketIndex'
import { FastRiderState } from '../types/ride-types'
import { LocalStorageKeys } from '../services/util-services'

const FastRider = () => {
  const [ticket, setTicket] = useState<null | Ticket | FastRiderState.RIDES>(
    null
  )

  useEffect(() => {
    checkAndRemoveExpiredTicket()
  }, [])

  const checkAndRemoveExpiredTicket = () => {
    const ticketString = localStorage.getItem(LocalStorageKeys.TICKET)
    if (!ticketString) {
      setTicket(FastRiderState.RIDES)
      return
    }

    const ticket = JSON.parse(ticketString)
    const returnTime = new Date(ticket.return_time).getTime()
    const currentTime = Date.now()

    if (currentTime >= returnTime) {
      localStorage.removeItem(LocalStorageKeys.TICKET)
      setTicket(FastRiderState.RIDES)
    } else setTicket(ticket)
  }

  return (
    <section className="page-layout fast-rider">
      <div className="page-content">
        <h1 className="page-title">The Jungle™ FastRider Service</h1>

        {ticket && (
          <>
            {ticket === FastRiderState.RIDES ? (
              <RidesIndex setTicket={setTicket} />
            ) : (
              <TicketIndex ticket={ticket} />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default FastRider
