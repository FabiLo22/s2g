
import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';
import { Ship } from './ship.entity';

@Entity('setup')
export class Setup {
  @ObjectIdColumn() id: ObjectId;
  @Column(type => Ship)
  ship: Ship;
  @Column() weapon: string;
}
