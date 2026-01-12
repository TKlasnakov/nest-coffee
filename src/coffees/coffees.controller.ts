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

@Controller('coffees')
export class CoffeesController {

    @Get()
    findAll(@Query() params) {
        return  Object.keys(params).length ? params : 'All Coffees';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Coffee ${id}`;
    }

    @Post()
    create(@Body() createCoffeeDto) {
        return `Coffee ${createCoffeeDto.name} created`;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto) {
        return `Coffee ${id} updated`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `Coffee ${id} removed`;
    }
}
