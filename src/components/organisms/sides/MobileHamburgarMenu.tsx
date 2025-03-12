import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const MobileHamburgarMenu = () => {
  const { userInfo, isLoggedIn } = useAuthStore();
  const navgiate = useNavigate();

  return (
    <div className='absolute mt-1 px-1 w-full h-full'>
      <nav className='w-full h-fit border rounded-2xl bg-white px-1 py-1 flex-col gap'>
        <div
          className='w-full px-2 py-[6px] flex items-center gap-2'
          onClick={() => navgiate('/')}
        >
          <div className='w-5 h-5'>
            <Icon type='homeSolid' color={'black'} />
          </div>
          <div className='text-sm ml-1'>피드</div>
        </div>
        <div
          className='w-full px-2 py-[6px] flex items-center gap-2'
          onClick={() => navgiate('/projects')}
        >
          <div className='w-5 h-5'>
            <Icon type='mailSolid' />
          </div>
          <div className='text-sm ml-1'>메세지</div>
        </div>
        <div
          className='w-full px-2 py-[6px] flex items-center gap-2'
          onClick={() => navgiate('/projects')}
        >
          <div className='w-5 h-5'>
            <Icon type='starSolid' />
          </div>
          <div className='text-sm ml-1'>커넥션 허브</div>
        </div>
        <div className='w-full px-2 py-[6px] flex items-center gap-2'>
          {isLoggedIn ? (
            <div className='border-t w-full border-black flex-col'>
              <div className='flex gap-3 h-[58px] pt-1 pb-1'>
                <Avatar
                  size='sm'
                  alt='User Avatar'
                  className='border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
                  src={userInfo?.profileUrl || undefined}
                />
                <div className='flex flex-col text-sm h-full w-full justify-between'>
                  <div className='text-md font-semibold'>{userInfo.name}</div>
                  <div className='text-gray'>@ {userInfo.nickname}</div>
                </div>
              </div>
              <div className='w-full flex flex-col text-sm items-start'>
                <div
                  className='w-full py-[6px] flex items-center gap-2'
                  onClick={() => navgiate(`/@${userInfo.nickname}`)}
                >
                  <div className='w-5 h-5'>
                    <Icon type='user' />
                  </div>
                  <div className='text-sm ml-1'>마이 페이지</div>
                </div>
                <div
                  className='w-full py-[6px] flex items-center gap-2'
                  onClick={() => navgiate('/settings')}
                >
                  <div className='w-5 h-5'>
                    <Icon type='cog' />
                  </div>
                  <div className='text-sm ml-1'>계정 설정</div>
                </div>
                <div
                  className='w-full py-[6px] flex items-center gap-2'
                  onClick={() => navgiate('/settings')}
                >
                  <div className='w-5 h-5'>
                    <Icon type='logout' />
                  </div>
                  <div className='text-sm ml-1'>로그아웃</div>
                </div>
              </div>
            </div>
          ) : (
            <a
              className='border rounded-sm border-black px-2 py-1 w-full text-center font-semibold'
              href='/login'
            >
              로그인/회원가입
            </a>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileHamburgarMenu;
