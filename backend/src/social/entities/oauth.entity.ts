import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('oauth')
export class Oauth {
  @ObjectIdColumn() id?: ObjectId;
  @Column() name: string;
  @Column() accessToken: string;
  @Column() refreshToken: string;
  @Column() expiresIn: number;
  @Column() obtainmentTimestamp: number;
}
