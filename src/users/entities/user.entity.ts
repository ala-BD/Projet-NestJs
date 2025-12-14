import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { IsString, IsEmail, IsBoolean, IsDate } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  active: boolean;

  @Column()
  @IsString()
  role: string;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsDate()
  updatedAt: Date;
}