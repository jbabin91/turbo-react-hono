import { faker } from '@faker-js/faker';
import { Argon2id } from 'oslo/password';

import { db } from '../src';
import env from '../src/env';
import {
  type InsertTask,
  type InsertUser,
  tasks as tasksTable,
  users as usersTable,
} from '../src/schema';

const adminUser = {
  email: 'admin.user@email.com',
  firstName: 'Admin',
  lastName: 'User',
  password: 'password',
};

type User = {
  hashedPassword: string;
} & Omit<InsertUser, 'password'>;

type Users = User[];
type Tasks = InsertTask[];

// Converter func cos Argon2id except secret as ArrayBuffer | TypedArray
const getArgonSecret = () => {
  return new TextEncoder().encode(env.ARGON_SECRET);
};

async function seed() {
  const argon2id = new Argon2id({ secret: getArgonSecret() });

  const users: Users = [
    {
      email: adminUser.email.toLowerCase(),
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      name: `${adminUser.firstName} ${adminUser.lastName}`,
      hashedPassword: await argon2id.hash(adminUser.password),
      role: 'admin',
    },
  ];
  const tasks: Tasks = [];

  console.log('🌱 Seeding the database');

  for (let i = 0; i < 79; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      hashedPassword: await argon2id.hash('password'),
      role: 'user',
    });
  }

  console.log('🌳 Seeding users');

  await db.insert(usersTable).values(users);

  console.log('✅ Done seeding users');

  console.log('🤔 Getting users from table');

  const usersInTable = await db.query.users.findMany();

  for (const user of usersInTable) {
    for (let i = 0; i < 60; i++) {
      tasks.push({
        name: faker.lorem.words(),
        done: faker.datatype.boolean(),
        authorId: user.id,
      });
    }
  }

  console.log('🌴 Seeding tasks');

  await db.insert(tasksTable).values(tasks);

  console.log('✅ Done seeding tasks');
}

try {
  await seed();
} catch (error) {
  console.error('❌ Error during seeding:', error);
} finally {
  process.exit(0);
}
