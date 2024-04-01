import { FC } from 'react';
import InfoIconItem, { InfoIconItemProps } from './InfoIconItem';

interface InfoIconListProps {
  InfoIcons: InfoIconItemProps[]
}

const InfoIconList: FC<InfoIconListProps> = ({InfoIcons}) => {
  return (
    <section className='info-icon-list'>
      {
        InfoIcons.map((item, idx) => {
            return <InfoIconItem {...item} key={idx} />
        })
      }
    </section>
  );
};

export default InfoIconList;