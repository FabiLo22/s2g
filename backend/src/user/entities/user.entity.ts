import { Oauth } from 'src/social/entities/oauth.entity';
import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn() id: ObjectId;
  @Column() username: string;
  @Column(type => Oauth)
  tokens: Oauth[];
}
