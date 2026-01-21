import { Injectable } from '@nestjs/common';
import { CoffeesService } from '../coffees/coffees.service';
import { CreateCoffeeDto } from '../coffees/dto/create-coffee.dto/create-coffee.dto';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}

  async recommendCoffee(coffee: CreateCoffeeDto) {
    return this.coffeesService.create(coffee);
  }
}
