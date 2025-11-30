import {
  Entity,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  AfterLoad,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Logger } from '@nestjs/common';
import { Exclude, Transform } from 'class-transformer';

@Entity('users')
export class User {
  @Exclude() // on exclut le logger de la sérialisation
  private readonly logger = new Logger(User.name);

  // Transforme l'ObjectId en string lors de la sérialisation
  @ObjectIdColumn()
  @Transform(({ value }) => value ? value.toHexString() : value, { toPlainOnly: true })
  id: ObjectId;

  @Column()
  email: string;

  @Exclude() // cache le mot de passe dans la réponse JSON
  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @BeforeInsert()
  beforeInsert() {
    this.logger.log(`BeforeInsert -> creating user with email: ${this.email}`);
  }

  @AfterInsert()
  afterInsert() {
    this.logger.log(`AfterInsert -> user created (email: ${this.email})`);
  }

  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`AfterUpdate -> user updated (email: ${this.email})`);
  }

  @BeforeRemove()
  beforeRemove() {
    this.logger.warn(`BeforeRemove -> removing user with id: ${this.id}`);
  }

  @AfterLoad()
  afterLoad() {
    this.logger.debug(`AfterLoad -> user loaded: ${this.email}`);
  }
}
