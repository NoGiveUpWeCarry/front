import { ListItem } from '@/components/molecules/ListItem';
import avatar from '@/assets/avatar.png';
import { cn } from '@/utils/cn';
import clsx from 'clsx';

const chatRooms = [
  {
    id: 1,
    avatar: avatar,
    title: '이재혁',
    subtitle: '이재혁, 이찬, 한태동',
    lastTime: '1h',
  },
  {
    id: 2,
    avatar: avatar,
    title: '이재혁',
    subtitle: '이재혁, 이찬, 한태동',
    lastTime: '1h',
  },
  {
    id: 3,
    avatar: avatar,
    title: '이재혁',
    subtitle: '이재혁, 이찬, 한태동',
    lastTime: '1h',
  },
];

const ChatSidebar = () => {
  return (
    <div>
      <div>
        <input type='text' defaultValue='이름' />
      </div>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <ListItem>
              <ListItem.Avatar size='sm' src={room.avatar} />
              <ListItem.Title className={cn('text-body1')}>
                {room.title}
              </ListItem.Title>
              <ListItem.Subtitle
                className={clsx('text-caption1', 'text-mediumgray')}
              >
                {room.subtitle}
              </ListItem.Subtitle>
              <ListItem.Label className={cn('text-caption1')}>
                {room.lastTime}
              </ListItem.Label>
            </ListItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
