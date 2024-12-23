import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn({ type: 'varchar', length: 150 })
  id!: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @Column({ type: 'simple-array', nullable: true })
  categories?: string[];

  @Column({ type: 'text', nullable: true })
  title?: string;

  @Column()
  date!: Date;

  @Column({ type: 'int', default: 0 })
  views!: number;

  @Column({ type: 'text', nullable: true })
  thumbnail?: string;
}
