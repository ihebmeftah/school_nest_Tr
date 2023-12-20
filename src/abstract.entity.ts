import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: Date,
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: Date,
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: Date,
    name: 'deleted_at',
  })
  deletedAt: Date;

  @VersionColumn()
  version: number;
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
