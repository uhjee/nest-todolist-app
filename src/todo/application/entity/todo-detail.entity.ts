import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '@todo/application/entity/todo.entity';

@Entity({
  name: 'todoDetail',
})
export class TodoDetail {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'text' })
  detailContent: string;

  @Column({ type: 'blob' })
  image: string;
}
