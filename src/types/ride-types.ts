interface RideZone {
  id: number
  name: string
  color: string
}

export interface Ride {
  id: number
  zone: RideZone
  name: string
  remaining_tickets: number
  return_time: string
}

export enum FastRiderState {
  RIDES = 'rides',
  TICKET = 'ticket',
}

export enum ErrorMsgs {
  LOAD_RIDES = 'Cannot load rides, please try again later',
  NO_SELECTED_RIDE = 'No selected ride',
  GENERAL = 'An error occurred, please try again later',
}
