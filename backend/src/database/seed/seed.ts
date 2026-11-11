
import { AppDataSource } from '../typeorm.config.js';
import { User } from '../../users/entities/users.entity.js';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../users/enum/roles.enum.js';

const adminUsers = [
  {
    username: 'admin1',
    email: 'admin1@gmail.com',
    avatar: 'https://i.pravatar.cc/300?img=12',
  },
  {
    username: 'admin2',
    email: 'admin2@gmail.com',
    avatar: 'https://i.pravatar.cc/300?img=13',
  },
  {
    username: 'admin3',
    email: 'admin3@gmail.com',
    avatar: 'https://i.pravatar.cc/300?img=14',
  },
];

const normalUsers = [
  'john', 'alex', 'michael', 'sarah', 'emma',
  'olivia', 'david', 'james', 'william', 'sophia',
  'isabella', 'charlotte', 'daniel', 'matthew', 'ethan',
  'lucas', 'amelia', 'mia', 'harper', 'evelyn',
  'benjamin', 'henry', 'jack', 'logan', 'ella',
  'grace', 'lily'
].map((username, index) => ({
  username,
  email: `${username}@gmail.com`,
  avatar: `https://i.pravatar.cc/300?img=${index + 1}`,
}));

async function seed() {
  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);

    const hashedPassword = await bcrypt.hash('User@123', 10);

    const users = [
      ...adminUsers.map((user) => ({
        ...user,
        role: Role.ADMIN,
      })),
      ...normalUsers.map((user) => ({
        ...user,
        role: Role.USER,
      })),
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`${userData.email} already exists`);
        continue;
      }

      const user = userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await userRepository.save(user);
      console.log(`Created: ${userData.username}`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
