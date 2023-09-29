import { Oauth } from 'src/social/entities/oauth.entity';
import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('abyssal')
export class Abyssal {
  @ObjectIdColumn() id: ObjectId;
  @Column() targetValue: number;
  @Column() currentValue: number;
}
