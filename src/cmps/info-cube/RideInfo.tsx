import { FC } from 'react'
import { Ride } from '../../types/ride-types'
import { formatTimeString } from '../../services/util-services'
import clockDisabledSvg from '../../assets/icons/clock-disabled.svg'
import ticketDisabledSvg from '../../assets/icons/ticket-disabled.svg'

interface RideInfoProps {
  ride: Ride
  onClick: (rideId: number) => void
}

const RideInfo: FC<RideInfoProps> = ({ ride, onClick }) => {
  const onRideClick = () => onClick(ride.id)

  return (
    <section className="ride-info" onClick={onRideClick}>
      <p className="zone-name bold">{ride.zone.name}</p>
      <h2>{ride.name}</h2>

      <div className="booking-info flex align-center space-between">
        <div className="flex align-center justify-center">
          <img src={clockDisabledSvg} alt="Clock" />
          <p className="bold">{formatTimeString(ride.return_time)}</p>
        </div>
        <div className="flex align-center justify-center">
          <img src={ticketDisabledSvg} alt="Ticket" />
          <p className="bold">{ride.remaining_tickets}</p>
        </div>
      </div>
    </section>
  )
}

export default RideInfo
