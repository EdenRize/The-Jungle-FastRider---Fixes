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
}

export enum RidesErrorMsgs {
  LOAD_ERROR = 'Cannot load rides, please try again later',
}
