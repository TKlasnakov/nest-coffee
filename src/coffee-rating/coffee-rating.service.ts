import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}

  async recommendCoffee(coffee: CreateCoffeeDto) {
    return this.coffeesService.create(coffee);
  }
}
