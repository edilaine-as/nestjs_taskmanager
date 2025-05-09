import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryColumn } from 'typeorm';

const { nanoid } = require('nanoid');

@Entity('tasks') // nome da tabela no banco
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    completed: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    generateId() {
        this.id = `task_${nanoid()}`
    }
}
