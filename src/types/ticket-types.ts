import { Ride } from './ride-types'

export interface Ticket {
  id: number
  ride: Ride
  access_code: string
  return_time: string
}
