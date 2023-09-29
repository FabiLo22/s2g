import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('player')
export class Player {
  @ObjectIdColumn() id?: ObjectId;
  @Column() character_id: number;
  @Column() name: string;
  @Column() alliance: string;
  @Column() corporation: string;
  @Column() ship: string;
}
