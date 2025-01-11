import clsx from 'clsx';
import { ListItem } from '@/components/molecules/ListItem';

const TerminatedChannel = () => {
  return (
    <ListItem.Subtitle className={clsx('text-caption1', 'text-mediumgray')}>
      종료된 채팅입니다.
    </ListItem.Subtitle>
  );
};

export default TerminatedChannel;
