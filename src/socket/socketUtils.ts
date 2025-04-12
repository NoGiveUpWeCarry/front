import { Socket } from 'socket.io-client';
import { Handlers } from './socketHandlers';
import { useChatStore } from '@/store/chatStore';
import useAuthStore from '@/store/authStore';

// 핸들러 래퍼 함수
function withValidationCheck<T extends any[]>(handler: (...args: T) => void) {
  return (...args: T) => {
    const socket = useChatStore.getState().socket;
    const user = useAuthStore.getState().userInfo;

    // 체크 순서: 로그인 -> 소켓 연결 -> 현재 채널
    if (!user) {
      alert('로그인을 해주세요');
      return;
    }

    if (!socket) {
      alert('소켓이 연결되지 않았습니다');
      return;
    }

    return handler(...args);
  };
}

// 소켓 이벤트 핸들러 설정
export function setupSocketEventHandlers(
  socket: Socket,
  socketHandlers: Handlers
) {
  Object.entries(socketHandlers).forEach(([event, handler]) => {
    socket.on(event, withValidationCheck(handler));
  });
}

// 소켓 이벤트 핸들러 제거
export function removeSocketEventHandlers(
  socket: Socket,
  socketHandlers: Handlers
) {
  Object.entries(socketHandlers).forEach(([event, handler]) => {
    socket.off(event, withValidationCheck(handler));
  });
}
