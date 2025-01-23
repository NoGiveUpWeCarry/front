import { Notification } from '@/apis/mypage';
import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { successHandler, useUpdateNoti } from '@/hooks/queries/mypage/settings';
import { useToggle } from '@/hooks/useToggle';
import { SettingsResponse } from '@/types/mypage.type';
import { useEffect } from 'react';

const TOGGLE_TEXT = [
  {
    title: '푸시 알림',
    description: '웹 푸시 알림을 받아볼 수 있어요',
    type: 'pushAlert',
  },
  {
    title: '피드 알림',
    description:
      '팔로잉하고 있는 유저의 피드가 업데이트되면 알림을 받아볼 수 있어요.',
    type: 'followingAlert',
  },
  {
    title: '프로젝트 / 외주 알림',
    description:
      '북마크하고 있는 프로젝트 또는 외주 모집 마감 알림을 받아볼 수 있어요.',
    type: 'projectAlert',
  },
];

const NotificationSection = ({
  settingsInfo,
}: {
  settingsInfo: SettingsResponse;
}) => {
  const {
    values: notifications,
    setValues: setNotifications,
    toggle: toggleNotification,
  } = useToggle<Notification>({
    pushAlert: false,
    followingAlert: false,
    projectAlert: false,
  });

  const { mutate } = useUpdateNoti();

  useEffect(() => {
    setNotifications(
      settingsInfo?.notifications || {
        pushAlert: false,
        followingAlert: false,
        projectAlert: false,
      }
    );
  }, [settingsInfo?.notifications]);

  const handleToggle = (type: keyof Notification) => {
    toggleNotification(type, () => {
      mutate(
        {
          noti: {
            ...notifications,
            [type]: !notifications[type],
          },
        },
        { onSuccess: successHandler }
      );
    });
  };

  return (
    <SettingsSection>
      <SettingsSection.Title>알림 설정</SettingsSection.Title>
      <SettingsSection.Description>
        필요한 알림만 받아보세요.
      </SettingsSection.Description>
      <SettingsSection.Content gap={20}>
        {TOGGLE_TEXT.map((item) => (
          <SettingsSection.TextWithToggle
            {...item}
            active={notifications[item.type as keyof Notification]}
            toggle={() => handleToggle(item.type as keyof Notification)}
          />
        ))}
      </SettingsSection.Content>
    </SettingsSection>
  );
};

export default NotificationSection;
