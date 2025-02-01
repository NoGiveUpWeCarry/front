import { ListItem } from '@/components/molecules/ListItem';
import avatar from '@/assets/images/avatar.svg';
import Avatar from '@/components/atoms/Avatar';
import Title from '@/components/atoms/Title';
import clsx from 'clsx';

const chatRooms = [
  {
    id: 1,
    avatar: avatar,
    title: '이재혁dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
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

const UserList = () => {
  return (
    <ul className='grow'>
      {chatRooms.map((room) => (
        <li key={room.id} className='h-[40px]'>
          <ListItem>
            <ListItem.Col>
              <Avatar size='xs' src={room.avatar} />
            </ListItem.Col>
            <ListItem.Col>
              <Title
                size='xs'
                fontWeight='medium'
                lineClamp={1}
                className='w-[266px]'
              >
                {room.title}
              </Title>
              <ListItem.Subtitle
                className={clsx('text-caption1', 'text-mediumgray')}
              >
                {room.subtitle}
              </ListItem.Subtitle>
            </ListItem.Col>
            <ListItem.Col className='justify-start'>
              <ListItem.Label
                className={clsx('text-caption1', 'text-mediumgray')}
              >
                {room.lastTime}
              </ListItem.Label>
            </ListItem.Col>
          </ListItem>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
