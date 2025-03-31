# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2025-01-24

### Added

- 채팅 페이지
- 로그인 / 로그아웃 / 회원가입
- 마이페이지
- 피드 페이지
- 커넥션 허브 페이지
- 레이아웃 (사이드 바)

## [0.1.1] - 2025-02-03

### Fixed

- 허브 모달 작성 완료시 '작성된 내용이 사라집니다' 문제 수정
- 커넥션 허브 글 작성시 바로 페이지에 반영되도록 수정
- 커넥션 허브 지원/지원 취소 시 새로고침 발생하던 문제 수정
- 피드 삭제시 에러 수정
- 마이페이지 작업물 추가하기 후 바로 반영되지 않는 문제 수정
- 설정 페이지 기술 스택 입력 안하면 엔터 눌러도 추가 안되도록 설정

### Added

- 커넥션 허브 팔로우 기능 추가

## [0.1.2] - 2025-02-04

### Fixed

- 피드 3줄 넘게 표시되던 문제 수정
- 피드 자기 자신 댓글 UI 수정
- 일부 Weekly Best Connection Hub 아이템 애니메이션 적용 안되는 문제 수정
- 허브 상세 아바타 팝업 위치 수정
- 한 줄 소개 수정
- 스킬 작성 시 자동으로 height 늘어나도록 수정

### Added

- 피드 디테일 페이지 좋아요 기능 추가
- 알림 시간 추가
- 계정 설정에 이메일 연결

### Changed

- 에디터 이미지 크기 제한
- 알림 최신순 정렬 (최신 알림이 위로 가게)

## [0.2.0] - 2025-03-17

### Added

- 채팅 메시지 검색 기능 추가

### Changed

- 모바일 사이즈 대응
- a11y 개선
  - `img` 태그에 alt 속성 추가
  - 컴포넌트 색상 대비를 좀 더 명확하게 수정
  - `button` 태그에 aria-label 속성 추가
- SEO 개선
  - 메타 태그 설정
  - robots.txt 파일 작성
  - [이미지 사이즈 최적화](https://github.com/NoGiveUpWeCarry/front/pull/155)

## [0.2.1] - 2025-03-24

### Fixed

- [피드 페이지 UI 수정](https://github.com/NoGiveUpWeCarry/front/issues/165)
- [레이아웃 UI 수정](https://github.com/NoGiveUpWeCarry/front/issues/162)

## [0.2.2] - 2025-03-27

### Fixed

- 채팅페이지 새로고침시 발생했던 에러 해결

### Changed

- 채팅페이지 반응형 개선

## [0.2.3] - 2025-03-31

### Changed

- 채팅방 반응형 개선
- 로그아웃 시 홈페이지로 이동하도록 수결
- 채팅방 이미지 전송 시 이미지 사이즈 최적화

### Fixed

- 피드, 프로젝트 검색 결과 표시 안 되는 문제 해결
