import SearchInput from '@/components/molecules/chat/SearchInput';
import UserList from '@/components/organisms/UserList';

const ChatSidebar = () => {
  return (
    <div className='flex flex-col gap-[24px] flex-1'>
      <SearchInput />
      <UserList />
    </div>
  );
};

export default ChatSidebar;
