export interface Channel {
  id: string;
  channelThumbnailURL?: string; // 기본 이미지 필요
  people: string[];
  lastSendTime: string;
  title: string;
}

// 그룹 채팅
export interface GroupChannel extends Channel {}

// 개인 채팅
export interface PersonalChannel extends Channel {}

// 종료된 채팅

type MessageTypes = 'image' | 'text';

export interface Message {
  type: MessageTypes;
  content: string;
  sender: string;
  channelId: string;
}
