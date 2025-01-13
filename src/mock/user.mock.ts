import { User } from '@/types/user.type';
import { fakerKO as faker } from '@faker-js/faker';

export const createUser = (id?: string): User => {
  return {
    id: id ? id : faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    nickname: faker.person.fullName(),
    profile_url: faker.image.avatar(),
    role_id: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
    auth_provider: faker.helpers.arrayElement(['github', 'google']),
  };
};

export const createUsers = (length: number): User[] => {
  return Array.from({ length }, () => createUser());
};

export const user = createUser();
