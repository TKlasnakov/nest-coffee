import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  exports: [],
  controllers: [],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
