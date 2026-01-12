import { 
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entity/coffee.entity';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() params) {
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(Number(id));
    }

    @Post()
    create(@Body() createCoffeeDto: Coffee) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto) {
        return this.coffeesService.update(Number(id), updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.delete(Number(id));
    }
}
