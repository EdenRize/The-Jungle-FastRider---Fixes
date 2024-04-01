import { FC } from 'react'

interface InfoCubeProps {
  children?: React.ReactNode
  color: string
  isHoverable?: boolean
  isSelected?: boolean
}

const InfoCube: FC<InfoCubeProps> = ({
  children,
  color,
  isHoverable,
  isSelected,
}) => {
  return (
    <section className="info-cube">
      <div
        style={{ backgroundColor: color }}
        className={`${isHoverable ? 'hoverable' : ''}${
          isSelected ? ' selected' : ''
        } top-color`}
      ></div>

      <div className="cube-content">{children}</div>
    </section>
  )
}

export default InfoCube
