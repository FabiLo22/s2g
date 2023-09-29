import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Ship } from './entities/ship.entity';
import { Setup } from './entities/setup.entity';

@Injectable()
export class OverlayService {
  constructor(
      @InjectRepository(Ship)
      private readonly shipRepository: MongoRepository<Ship>,
      @InjectRepository(Setup)
      private readonly setupRepository: MongoRepository<Ship>      
    ) {}

    getShips() {
      return this.shipRepository.find();
    }
  
    async getShip(shipname) {
      const ship = await this.shipRepository.findOneBy({ 'shipname': shipname});
      
      if(!ship) {
        throw new NotFoundException();
      }
  
      return ship;
    }
  
    createShip(shipData) {
      const ship = new Ship();
      ship.typeID = shipData.typeID;
      ship.shipname = shipData.shipname;
      this.shipRepository.save(ship);
  
      return ship;
    }
    
    getSetup() {
      return this.setupRepository.find();
    }

    setupAddShip(ship) {
      const setup = new Setup();
      setup.ship = ship.ship;
      setup.weapon = ship.weapon;
      this.setupRepository.save(setup);
  
      return setup;
    }

    async setupDeleteShip(id) {
      console.log(id);
      await this.setupRepository.delete(id);

      return this.getSetup();
    }
}
