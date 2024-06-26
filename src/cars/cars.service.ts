import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
            
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
            
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee',
            
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById( id:string ){
        const car = this.cars.find( car => car.id === id );
        if( !car ) throw new NotFoundException(`Car with id ${id} Not Found `);

        return car;

    }

    create( createCarDto: CreateCarDto ){
        const newCar: Car = {
            id: uuid(),
            ...createCarDto// Esparcimos las propiedades en el nuevo objeto
        }
        this.cars.push( newCar );
        return newCar;
    }

    update( id: string, updateCarDto: UpdateCarDto ){

        let carDB = this.findOneById( id );

        if ( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException('Car id is not valid inside body') // Esta validacion esta de más pero es un ejemplo

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                carDB = {...carDB,...updateCarDto, id}
                
                return carDB;
            }

            return car;
        })


        return carDB ; // carro actualizado
    }

    delete ( id:string ){
        this.findOneById( id );
        this.cars = this.cars.filter( car => car.id !== id );
        
    }

}
