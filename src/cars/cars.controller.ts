import { Body, Controller, Delete, Get, Param,  ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto copy';

@Controller('cars')
//! UNICO OBJETIVO DE LOS CONTROLADORES ES ESCUCHAR SOLICITUDES DEL CLIENTE Y RESPONDERLAS
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
        return this.carsService.create( createCarDto );

    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto )
    {

        return this.carsService.update( id, updateCarDto );
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string ){
        return this.carsService.delete( id );
    }



}
