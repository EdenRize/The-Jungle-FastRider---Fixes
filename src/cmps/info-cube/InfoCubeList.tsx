import { FC } from 'react'
import InfoCube from './InfoCube'

export interface infoCubeProp {
  children: React.ReactNode
  color: string
  id?: number
}

interface InfoCubeListProps {
  selectedId: number | null
  infoCubes: infoCubeProp[]
  isHoverable?: boolean
}

const InfoCubeList: FC<InfoCubeListProps> = ({
  infoCubes,
  isHoverable,
  selectedId,
}) => {
  return (
    <section className="info-cube-list">
      {infoCubes.map((cube, idx) => (
        <InfoCube
          key={idx}
          color={cube.color}
          children={cube.children}
          isHoverable={isHoverable}
          isSelected={cube.id === selectedId}
        />
      ))}
    </section>
  )
}

export default InfoCubeList
