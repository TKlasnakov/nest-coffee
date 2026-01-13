import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private _coffees: Coffee[] = [
    {
      id: 1,
      name: 'Coffee 1',
      brand: 'Brand 1',
      flavors: ['flavor 1', 'flavor 2'],
    },
  ];

  findAll(): Coffee[] {
    return this._coffees;
  }

  findOne(id: number): Coffee | undefined {
    const coffee = this._coffees.find((coffee) => coffee.id === id);

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(coffee: CreateCoffeeDto): string {
    this._coffees.push({ ...coffee, id: this._coffees.length + 1 });

    return `Coffee ${coffee.name} created`;
  }

  update(id: number, coffee: UpdateCoffeeDto): string {
    this._coffees = this._coffees.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return Object.keys(coffee).reduce((acc, key) => {
        acc[key] = coffee[key];
        return acc;
      }, item);
    });


    return `Coffee ${coffee.name} updated`;
  }

  delete(id: number): string {
    this._coffees = this._coffees.filter((coffee) => coffee.id !== id);

    return `Coffee #${id} deleted`;
  }
}
