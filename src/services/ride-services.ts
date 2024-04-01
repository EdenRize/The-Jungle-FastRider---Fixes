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
    const formData = new URLSearchParams()
    formData.append('pin', PIN)
    formData.append('ride_id', rideId.toString())
    formData.append('token', TOKEN)

    const response = await fetch(`${BASE_URL}tickets?api_key=${TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formData,
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
  const splittedPIN = PIN.split('-')

  if (!_validatePINSyntax(splittedPIN)) return false

  const firstASCII = getNumericGroupASCII(splittedPIN[1])
  const secondASCII = getNumericGroupASCII(splittedPIN[2])

  if (splittedPIN[3][0] !== firstASCII || splittedPIN[3][1] !== secondASCII)
    return false

  return true
}

const getNumericGroupASCII = (group: string) => {
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

const _validatePINSyntax = (splittedPIN: string[]) => {
  return (
    splittedPIN.length === 4 &&
    splittedPIN[0].length === 2 &&
    splittedPIN[3].length === 2 &&
    splittedPIN[1].length === 4 &&
    splittedPIN[2].length === 4 &&
    splittedPIN[0].match(/^[A-Z]{2}$/) &&
    splittedPIN[3].match(/^[A-Z]{2}$/) &&
    !isNaN(+splittedPIN[1]) &&
    !isNaN(+splittedPIN[2])
  )
}
