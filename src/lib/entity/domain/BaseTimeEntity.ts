import { LocalDateTime } from 'js-joda';
import { LocalDateTimeTransformer } from 'src/lib/entity/transformer/LocalDateTimeTransformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseTimeEntity extends BaseEntity {
  // @CreateDateColumn() :: null로 들어가는 현상 존재, 일단 아래와 같이 처리
  @Column({
    name: 'created_at',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
  })
  createdAt!: LocalDateTime;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
  })
  updatedAt!: LocalDateTime;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
  })
  deletedAt: LocalDateTime;

  @BeforeInsert()
  protected beforeInsert() {
    const now = LocalDateTime.now();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    const now = LocalDateTime.now();
    this.updatedAt = now;
  }

  // 동작 안함;
  // @BeforeSoftRemove()
  // protected beforeSoftRemove() {
  //   const now = LocalDateTime.now();
  //   this.deletedAt = now;
  // }
}
