import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')

export class CarsController {
    
    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        console.log(this.carsService);
        return this.carsService.findAll();
    }

    @Get(':id') // todos los controladores son endpoints
    getCarById( @Param('id', ParseUUIDPipe) id: string ) {// Si no es un UUID siquiera llegara al servicio
        return this.carsService.findOneById( id );
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto ){
        return createCarDto;
    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any )
    {
        return body;
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseIntPipe) id: number ){
        return {
            method: 'delete',
            id
        }
    }



}
