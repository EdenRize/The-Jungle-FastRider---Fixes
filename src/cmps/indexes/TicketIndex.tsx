import { FC } from 'react'
import { Ticket } from '../../types/ticket-types'
import InfoIconItem from '../info-icon/InfoIconItem'
import InfoCube from '../info-cube/InfoCube'
import TicketInfo from '../info-cube/TicketInfo'
import confirmSvg from '../../assets/icons/confirm.svg'

interface TicketIndexProps {
  ticket: Ticket
}

const TicketIndex: FC<TicketIndexProps> = ({ ticket }) => {
  return (
    <section className="ticket-index">
      <InfoIconItem
        iconPath={confirmSvg}
        text="Thank you for using The Jungle™ FastRider ticket system - your access code is now ready!"
      />

      <InfoCube
        children={<TicketInfo ticket={ticket} />}
        color={ticket.ride.zone.color}
      />
    </section>
  )
}

export default TicketIndex
