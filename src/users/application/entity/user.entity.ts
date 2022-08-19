import { UserRole } from '../enum/UserRole';
import { BooleanTransformer } from 'src/common/transformer/BooleanTransformer';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseTimeEntity } from '@common/entity/base-time.entity';
import { Todo } from '@todo/application/entity/todo.entity';
import { TodoDetail } from '@todo/application/entity/todo-detail.entity';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @IsEmail()
  @ApiProperty({
    example: 'aaa@gamil.com',
    description: '사용자 이메일',
  })
  @Column('varchar', { unique: true, length: 30 })
  email: string;

  @Column()
  name: string;

  @IsString()
  @Column('varchar', { length: 100, select: false })
  password: string;

  @Column()
  role: UserRole;

  @Column({
    type: 'boolean',
    default: false,
    transformer: new BooleanTransformer(),
  })
  isBlackUser: boolean;

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToOne((type) => TodoDetail, {
    cascade: true,
  })
  @JoinColumn()
  todoDetail: TodoDetail;
}
