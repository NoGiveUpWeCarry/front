import GroupChannel from '@/components/organisms/chat/GroupChannel';
import PersonalChannel from '@/components/organisms/chat/PersonalChannel';
import TerminatedChannel from '@/components/organisms/chat/TerminatedChannel';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/shallow';

const ChannelList = () => {
  const [channels, setChannel] = useChatStore(
    useShallow((state) => [state.channels, state.setChannel])
  );

  return (
    <ul className='grow flex flex-col gap-[24px]'>
      {channels.map((channel) => (
        <li key={channel.id} onClick={() => setChannel(channel.id)}>
          {channel.people.length > 2 && <GroupChannel channel={channel} />}
          {channel.people.length === 2 && <PersonalChannel channel={channel} />}
          {channel.people.length < 2 && <TerminatedChannel channel={channel} />}
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
