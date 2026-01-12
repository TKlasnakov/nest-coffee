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
        }
    ]

    findAll() {
        return this._coffees;
    }

    findOne(id: number) {
        return this._coffees.find(coffee => coffee.id === id);
    }

    create(coffee: Coffee) {
        this._coffees.push(coffee);

        return `${coffee.name} created`;
    }

    update(id: number, coffee: Coffee) {
        this._coffees = Object.keys(this._coffees).map(key => {
            if (this._coffees[key].id !== id) {
                return this._coffees[key];
            }

            return coffee;
        });

        return this._coffees;
    }

    delete(id: number) {
        this._coffees = this._coffees.filter(coffee => coffee.id !== id);

        return this._coffees;
    }
}
