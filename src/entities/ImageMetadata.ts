import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class ImageMetadata{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    imageName?: string;

    @Column("jsonb")
    metadata?: object;

    @Column({ type: 'timestamp'})
    lastFetched?: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

}