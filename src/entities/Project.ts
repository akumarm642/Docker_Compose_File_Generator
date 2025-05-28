import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true})
    description?: string;

    @Column({ default: "active"})
    status!: string

    @ManyToOne(()=> User, (user) => user.projects, { onDelete: 'CASCADE' })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!
    : Date;

}
