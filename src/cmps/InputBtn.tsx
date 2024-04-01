import { ChangeEventHandler, FC } from 'react'

interface InputBtnProps {
  onSubmit: Function
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string | number
  placeholder?: string
  type?: 'text' | 'number'
  btnLabel?: string
  isShowBtn?: boolean
}

const InputBtn: FC<InputBtnProps> = ({
  onSubmit,
  onChange,
  type = 'text',
  value,
  placeholder,
  btnLabel = 'SUBMIT',
  isShowBtn = true,
}) => {
  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault()
    onSubmit(ev)
  }

  return (
    <form onSubmit={onFormSubmit} className="input-btn">
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <button className={`${isShowBtn ? 'shown' : ''}`}>{btnLabel}</button>
    </form>
  )
}

export default InputBtn
