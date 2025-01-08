import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

const SettingsPage = () => {
  return (
    <div className='w-full mt-[-24px] relative'>
      <div className='w-[250px] h-screen absolute left-0'></div>
      <div className='w-[783px] min-h-screen mx-auto'>
        <div className='w-[700px] h-full mx-auto flex flex-col gap-[100px]'>
          <SettingsSection>
            <SettingsSection.Title>기본 정보</SettingsSection.Title>
            <SettingsSection.Description>
              나를 소개해 보세요.
            </SettingsSection.Description>
            <SettingsSection.Content gap={20}>
              <div className='mt-5 flex gap-[22px] py-[10px]'>
                <Avatar size='md' />
                <div className='flex flex-col'>
                  <span className='text-[15px]'>프로필 사진</span>
                  <span className='mt-[5px] text-[12px] text-[#838383]'>
                    10MB 이하 PNG, JPG, GIF, SVG를 올려주세요.
                  </span>
                  <div className='mt-[23px] flex gap-[10px] items-center text-white text-[10px]'>
                    <Button
                      width='66px'
                      height='100%'
                      radius='sm'
                      className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] py-1'
                    >
                      사진 업로드
                    </Button>
                    <Button
                      width='66px'
                      height='100%'
                      radius='sm'
                      className='border border-[#2E2E2E] py-1 !text-[#2E2E2E]'
                    >
                      사진 삭제
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-[20px]'>
                <SettingsSection.InputWithLabel label='한 줄 소개' />
                <div className='flex justify-between'>
                  <SettingsSection.InputWithLabel
                    label='상태'
                    className='w-[240px]'
                  >
                    <button className='border border-[#838383] rounded-[10px] h-10 bg-transparent outline-none flex justify-between items-center px-[15px] py-[11px]'>
                      <span className='text-[15px]'>프로젝트 구하는 중</span>
                      <ChevronDownIcon width={20} color='#838383' />
                    </button>
                  </SettingsSection.InputWithLabel>
                  <SettingsSection.InputWithLabel
                    label='직무'
                    className='w-[440px]'
                  />
                </div>
                <SettingsSection.InputWithLabel label='스킬'>
                  <div className='border border-[#838383] rounded-[10px] h-10 bg-transparent outline-none flex justify-between items-center px-[15px] py-[11px]'></div>
                </SettingsSection.InputWithLabel>
                <div className='flex flex-col gap-2'>
                  <label className='text-[15px] font-medium'>링크</label>
                </div>
              </div>
            </SettingsSection.Content>
          </SettingsSection>
          <SettingsSection>
            <SettingsSection.Title>알림 설정</SettingsSection.Title>
            <SettingsSection.Description>
              필요한 알림만 받아보세요.
            </SettingsSection.Description>
            <SettingsSection.Content gap={20}>
              <SettingsSection.TextWithToggle
                title='푸시 알림'
                description='웹 푸시 알림을 받아볼 수 있어요'
                active={false}
                toggle={() => {}}
              />
              <SettingsSection.TextWithToggle
                title='피드 알림'
                description='팔로잉하고 있는 유저의 피드가 업데이트되면 알림을 받아볼 수 있어요.'
                active={true}
                toggle={() => {}}
              />
              <SettingsSection.TextWithToggle
                title='프로젝트 / 외주 알림'
                description='북마크하고 있는 프로젝트 또는 외주 모집 마감 알림을 받아볼 수 있어요.'
                active={true}
                toggle={() => {}}
              />
            </SettingsSection.Content>
          </SettingsSection>
          <SettingsSection>
            <SettingsSection.Title>계정 설정</SettingsSection.Title>
            <SettingsSection.Description>
              계정 정보를 확인하고 수정할 수 있어요.
            </SettingsSection.Description>
            <SettingsSection.Content gap={20}>
              <div>
                <div className='flex gap-[100px] items-center'>
                  <label>연결된 이메일</label>
                  <span>pad@gmail.com</span>
                </div>
                <span className='text-[10px] text-[#7D7D7D] mt-[-10px]'>
                  이메일은 변경할 수 없어요.
                </span>
              </div>
              <SettingsSection.InputWithLabel
                label='유저 네임'
                button={{
                  text: '변경',
                  color: 'normal',
                }}
              />
              <span className='text-[10px] text-[#7D7D7D] mt-[-10px]'>
                유저네임을 변경하면 프로필 페이지 링크도 변경됩니다.
              </span>
              <SettingsSection.Divider />
            </SettingsSection.Content>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
