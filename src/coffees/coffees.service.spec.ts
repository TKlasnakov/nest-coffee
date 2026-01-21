import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entity/flavor.entity';
import { Coffee } from './entity/coffee.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('when coffee with ID existss hould return the coffee object', async () => {
      const coffeeId = 1;
      const expectedCoffee = {};

      coffeeRepository.findOne!.mockReturnValue(expectedCoffee);
      const coffee = await service.findOne(coffeeId);
      expect(coffee).toEqual(expectedCoffee);
    });
    it('should throw the "NotFoundException"', async () => {
      const coffeeId = '1';
      coffeeRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(coffeeId);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
      }
    });
  });
});