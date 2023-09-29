
import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('ship')
export class Ship {
  @ObjectIdColumn() id: ObjectId;
  @Column() typeID: number;
  @Column() shipname: string;
}
