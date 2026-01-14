import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeeRepository: Repository<Coffee>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find({
      relations: { flavors: true },
    });
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: { flavors: true },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee = this.coffeeRepository.create(createCoffeeDto);

    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: number, updatedCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updatedCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async delete(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.remove(coffee);
  }
}
