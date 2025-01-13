export interface Channel {
  channelId: string;
  //  channelThumbnailURL?: string; // 기본 이미지 필요
  //  users: User[];
  // lastSendTime: string;
  // title: string;
}

// 그룹 채팅
export interface GroupChannel extends Channel {}

// 개인 채팅
export interface PersonalChannel extends Channel {}
