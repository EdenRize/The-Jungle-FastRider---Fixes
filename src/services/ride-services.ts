import { Ride } from '../types/ride-types'
import { Ticket } from '../types/ticket-types'

const BASE_URL = 'https://fast-rider.herokuapp.com/api/v1/'
const TOKEN = '433898df4a3e992b8411004109e4d574a90695e39e'

export const getRides = async (): Promise<Ride[]> => {
  try {
    const response = await fetch(`${BASE_URL}rides?token=${TOKEN}`)
    if (!response.ok) {
      throw new Error('Failed to fetch rides')
    }
    const ridesData = await response.json()
    return ridesData
  } catch (err) {
    throw err
  }
}

export const bookTicket = async (
  rideId: number,
  PIN: string
): Promise<Ticket> => {
  try {
    if (!_validatePIN(PIN)) throw new Error('Invalid PIN')
    const response = await fetch(`${BASE_URL}tickets`, {
      method: 'POST',
      body: new URLSearchParams({
        pin: PIN,
        ride_id: rideId.toString(),
        token: TOKEN,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const ticketData = await response.json()
    return ticketData
  } catch (err) {
    throw err
  }
}

const _validatePIN = (PIN: string) => {
  if (!/^(JN)-(\d{4})-(\d{4})-([A-Z]{2})$/.test(PIN)) return false
  const splittedPIN = PIN.split('-')

  const firstASCII = _getNumericGroupASCII(splittedPIN[1])
  const secondASCII = _getNumericGroupASCII(splittedPIN[2])

  return splittedPIN[3][0] === firstASCII && splittedPIN[3][1] == secondASCII
}

const _getNumericGroupASCII = (group: string) => {
  const groupSum = group.split('').reduce((acc, currNumber, idx) => {
    const isEven = (idx + 1) % 2 === 0
    let calcNumber = isEven ? +currNumber * 2 : +currNumber
    if (calcNumber > 9) {
      const numberStringify = calcNumber.toString()
      calcNumber = +numberStringify[0] + +numberStringify[1]
    }
    acc += calcNumber
    return acc
  }, 0)

  return String.fromCharCode((groupSum % 26) + 65)
}
