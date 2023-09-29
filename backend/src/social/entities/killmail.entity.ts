import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';
import { Player } from './player.entity';

@Entity('killmail')
export class Killmail {
  @ObjectIdColumn() id?: ObjectId;
  @Column() killmail_id: number;
  @Column() killmail_time: number;
  @Column() solar_system: string;
  @Column() victim: Player;
  @Column() attackers: Player[];
  @Column() value: number;
}
