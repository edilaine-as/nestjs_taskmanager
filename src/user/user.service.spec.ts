import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User)) as jest.Mocked<UserRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const newUser = {
      name: 'John',
      email: 'test@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash(newUser.password, 6);

    const expectedUser = {
      id: '1',
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.create.mockResolvedValue(expectedUser);

    const user = await service.create(newUser);

    expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 6);
    expect(userRepository.create).toHaveBeenCalledWith(newUser, hashedPassword);
    expect(user).toEqual(expectedUser);
  });

  it('should return user without password if credentials are valid', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 6);
    const newUser = {
      id: '1',
      name: 'John',
      email: 'test@example.com',
      password: hashedPassword,
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.findByEmail.mockResolvedValue(newUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true); 
    const user = await service.validateUser(newUser.email, password);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
    expect(user).toEqual(expect.objectContaining({ id: newUser.id, email: newUser.email }));
  });
});
