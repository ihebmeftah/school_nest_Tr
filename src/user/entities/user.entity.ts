import { AbstractEntity } from 'src/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as argon2 from 'argon2';

@Entity('users')
export class UserEntity extends AbstractEntity<UserEntity> {
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  phone: string;
  @Column()
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
