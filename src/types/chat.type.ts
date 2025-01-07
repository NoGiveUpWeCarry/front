export interface Channel {
  id: number;
  roomThumbnailURL?: string; // 기본 이미지 필요
  people: string[];
  lastTime: string;
  selected: boolean;
  title: string;
}

// 그룹 채팅
export interface GroupChannel extends Channel {}

// 개인 채팅
export interface PersonalChannel extends Channel {}

// 종료된 채팅
