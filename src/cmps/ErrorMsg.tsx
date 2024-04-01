import { FC, useEffect, useRef, useState } from 'react'

interface ErrorMsgProps {
  msg?: string
  setMsg: Function
  showTime?: number
}

const ErrorMsg: FC<ErrorMsgProps> = ({ msg, setMsg, showTime = 3000 }) => {
  const [currMsg, setCurrMsg] = useState<string>('')
  const timeOutId = useRef<number | undefined>()

  useEffect(() => {
    if (msg) {
      clearTimeout(timeOutId.current)
      setCurrMsg(msg)

      timeOutId.current = setTimeout(() => {
        setMsg('')
      }, showTime)
    }
  }, [msg])

  return (
    <section className={`${msg ? 'shown' : ''} error-msg`}>
      <p className="bold white">{currMsg}</p>
    </section>
  )
}

export default ErrorMsg
