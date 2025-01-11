import SettingsSection from '@/components/organisms/settings/SettingsSection';
import { useToggle } from '@/hooks/useToggle';
import { forwardRef } from 'react';

const NotificationSection = forwardRef<HTMLDivElement>(() => {
  const { values: notifications, toggle: toggleNotification } = useToggle({
    push: false,
    feed: false,
    project: false,
  });

  return (
    <SettingsSection>
      <SettingsSection.Title>알림 설정</SettingsSection.Title>
      <SettingsSection.Description>
        필요한 알림만 받아보세요.
      </SettingsSection.Description>
      <SettingsSection.Content gap={20}>
        <SettingsSection.TextWithToggle
          title='푸시 알림'
          description='웹 푸시 알림을 받아볼 수 있어요'
          active={notifications.push}
          toggle={() => toggleNotification('push')}
        />
        <SettingsSection.TextWithToggle
          title='피드 알림'
          description='팔로잉하고 있는 유저의 피드가 업데이트되면 알림을 받아볼 수 있어요.'
          active={notifications.feed}
          toggle={() => toggleNotification('feed')}
        />
        <SettingsSection.TextWithToggle
          title='프로젝트 / 외주 알림'
          description='북마크하고 있는 프로젝트 또는 외주 모집 마감 알림을 받아볼 수 있어요.'
          active={notifications.project}
          toggle={() => toggleNotification('project')}
        />
      </SettingsSection.Content>
    </SettingsSection>
  );
});

export default NotificationSection;
