import { Injectable } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';

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
    return this._coffees.find((coffee) => coffee.id === id);
  }

  create(coffee: Coffee): string {
    this._coffees.push(coffee);

    return `${coffee.name} created`;
  }

  update(id: number, coffee: Coffee): Coffee[] {
    this._coffees = this._coffees.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return coffee;
    });

    return this._coffees;
  }

  delete(id: number): Coffee[] {
    this._coffees = this._coffees.filter((coffee) => coffee.id !== id);

    return this._coffees;
  }
}
