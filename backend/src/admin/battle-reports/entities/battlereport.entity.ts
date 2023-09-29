import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('battlereport')
export class BattleReport {
  @ObjectIdColumn() _id?: ObjectId;
  @Column() name: string;
  @Column() starttime: number;
  @Column() endtime: number;
  @Column() systems: any[];
}
