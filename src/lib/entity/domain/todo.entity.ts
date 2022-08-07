import { BaseTimeEntity } from '@entity/domain/BaseTimeEntity';
import { TodoStatus } from '@entity/enum/TodoStatus';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'todo',
  orderBy: {
    id: 'DESC',
    status: 'ASC',
  },
})
export class Todo extends BaseTimeEntity {
  // TODO: bigint 전환 이슈?
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  status: TodoStatus;

  @ManyToOne((type) => User, (user) => user.todos, { eager: true })
  user: User;
}
