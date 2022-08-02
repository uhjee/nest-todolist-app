import { UserRole } from '@entity/enum/UserRole';
import { BooleanTransformer } from 'src/lib/transformer/BooleanTransformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { Todo } from './todo.entity';

@Entity()
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
