import { UserRole } from '../enum/UserRole';
import { BooleanTransformer } from 'src/common/transformer/BooleanTransformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseTimeEntity } from '@common/entity/base-time.entity';
import { Todo } from '@todo/application/entity/todo.entity';

@Entity()
@Unique(['email'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
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
}
