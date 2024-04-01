import { FC } from 'react'
import { Ticket } from '../../types/ticket-types'
import { formatTimeString } from '../../services/util-services'

interface TicketInfoProps {
  ticket: Ticket
}

const TicketInfo: FC<TicketInfoProps> = ({ ticket }) => {
  return (
    <section className="flex column justify-center ticket-info">
      <div className="flex align-center space-between ticket-ride-info">
        <p className="ride-name white">{ticket.ride.name}</p>
        <p className="bold">{ticket.ride.zone.name}</p>
      </div>

      <div className="flex column align-center return-info details-container">
        <p className="bold">Return At</p>
        <p className="white info">{formatTimeString(ticket.return_time)}</p>
      </div>

      <div className="flex column align-center details-container">
        <p className="bold">Use Access Code</p>
        <p className="white info">{ticket.access_code}</p>
      </div>
    </section>
  )
}

export default TicketInfo
