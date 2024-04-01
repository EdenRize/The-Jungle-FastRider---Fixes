import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react'
import { InfoIconItemProps } from '../cmps/info-icon/InfoIconItem'
import InfoIconList from '../cmps/info-icon/InfoIconList'
import InputBtn from '../cmps/InputBtn'
import InfoCubeList, { infoCubeProp } from '../cmps/info-cube/InfoCubeList'
import RideInfo from '../cmps/info-cube/RideInfo'
import { bookTicket, getRides } from '../services/ride-services'
import { Ride, RidesErrorMsgs } from '../types/ride-types'
import { Ticket } from '../types/ticket-types'
import ErrorMsg from '../cmps/ErrorMsg'
import { LocalStorageKeys } from '../services/util-services'
import ticketSvg from '../assets/icons/ticket.svg'
import arrowSvg from '../assets/icons/arrow.svg'
import clockSvg from '../assets/icons/clock.svg'
import Loader from '../cmps/Loader'

interface RidesIndexProps {
  setTicket: (ticket: Ticket | null) => void
}

const RidesIndex: FC<RidesIndexProps> = ({ setTicket }) => {
  const [pin, setPin] = useState<string>(localStorage.getItem('PIN') || '')
  const [infoCubes, setInfoCubes] = useState<null | infoCubeProp[]>(null)
  const [selectedRide, setSelectedRide] = useState<null | number>(null)
  const [isShowBtn, setIsShowBtn] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const infoCubeListRef = useRef<HTMLDivElement>(null)

  const infoIcons: InfoIconItemProps[] = [
    {
      iconPath: ticketSvg,
      text: 'Enter your park ticket #PIN number, then select the desired ride while noting the stated return time',
    },
    {
      iconPath: arrowSvg,
      text: 'Press ʻsubmitʻ to confirm and retrieve your access code',
    },
    {
      iconPath: clockSvg,
      text: 'When the time comes, use the special FastRider line to cut out a considerable wait time',
    },
  ]

  useEffect(() => {
    loadRides()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (!infoCubeListRef.current) return
    const rect = infoCubeListRef.current.getBoundingClientRect()
    if (rect.top <= 100) {
      setIsShowBtn(true)
      window.removeEventListener('scroll', handleScroll)
    }
  }

  const loadRides = async () => {
    try {
      const rides = await getRides()
      updateInfoCubes(rides)
    } catch (err) {
      setErrorMsg(RidesErrorMsgs.LOAD_ERROR)
    }
  }

  const updateInfoCubes = (rides: Ride[]) => {
    const cubes = rides.map((ride) => ({
      children: <RideInfo ride={ride} onClick={onRideClick} />,
      color: ride.zone.color,
      id: ride.id,
    }))
    setInfoCubes(cubes)
  }

  const onFormSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault()
      localStorage.setItem('PIN', pin)
      if (!selectedRide) {
        setErrorMsg('No selected ride')
        return
      }

      const ticket = await bookTicket(selectedRide, pin)
      localStorage.setItem(LocalStorageKeys.TICKET, JSON.stringify(ticket))
      setTicket(ticket)
    } catch (err: any) {
      if (err && typeof err.message === 'string') setErrorMsg(err.message)
      else setErrorMsg(RidesErrorMsgs.LOAD_ERROR)
    }
  }

  const onPINChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setPin(ev.target.value)
  }

  const onRideClick = (rideId: number) => {
    setSelectedRide((prevRide) => (prevRide === rideId ? null : rideId))
  }

  return (
    <section className="rides-index">
      <InfoIconList InfoIcons={infoIcons} />

      <InputBtn
        onChange={onPINChange}
        onSubmit={onFormSubmit}
        value={pin}
        placeholder="#PIN"
        isShowBtn={isShowBtn}
      />

      <div ref={infoCubeListRef}>
        {infoCubes ? (
          <InfoCubeList
            selectedId={selectedRide}
            infoCubes={infoCubes}
            isHoverable={true}
          />
        ) : (
          <Loader />
        )}
      </div>

      <ErrorMsg msg={errorMsg} setMsg={setErrorMsg} />
    </section>
  )
}

export default RidesIndex
