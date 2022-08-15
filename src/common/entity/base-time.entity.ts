import { LocalDateTime } from 'js-joda';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({
    // name: 'created_at',
    // type: 'timestamp',
    // transformer: new LocalDateTimeTransformer(),
    // nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    // name: 'updated_at',
    // type: 'timestamp',
    // transformer: new LocalDateTimeTransformer(),
  })
  updatedAt: Date;

  @DeleteDateColumn({
    // name: 'deleted_at',
    // type: 'timestamp',
    // transformer: new LocalDateTimeTransformer(),
  })
  deletedAt: Date;

  // @BeforeInsert()
  // protected beforeInsert() {
  //   const now = LocalDateTime.now();
  //   this.createdAt = now;
  //   this.updatedAt = now;
  // }

  // @BeforeUpdate()
  // protected beforeUpdate() {
  //   const now = LocalDateTime.now();
  //   this.updatedAt = now;
  // }

  // 동작 안함;
  // @BeforeSoftRemove()
  // protected beforeSoftRemove() {
  //   const now = LocalDateTime.now();
  //   this.deletedAt = now;
  // }
}
