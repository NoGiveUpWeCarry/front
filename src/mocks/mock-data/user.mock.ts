import useAuthStore from '@/store/authStore';
import { User } from '@/types/user.type';
import { fakerKO as faker } from '@faker-js/faker';

export const createUser = (userId?: number): User => {
  return {
    userId: userId
      ? userId
      : faker.helpers.rangeToNumber({ min: 100, max: 1000 }), // 0 ~ 99 까지는 실제 회원가입한 사용자 id 영역
    email: faker.internet.email(),
    name: faker.person.fullName(),
    nickname: faker.person.fullName(),
    profileUrl: faker.image.avatar(),
    roleId: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
    authProvider: faker.helpers.arrayElement(['github', 'google', 'pad']),
  };
};

export const createUsers = (length: number): User[] => {
  return Array.from({ length }, () => createUser());
};

export const me = useAuthStore.getState().userInfo;

export const users = [...createUsers(5), ...(me ? [me] : [])]; // 가짜 유저 5명 + 나(로그인한 사용자)
