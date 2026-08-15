import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  phone: string;

  @Column('json')
  services: { title: string; description: string }[];

  @Column('json')
  pricingPlans: { name: string; price: string; detail: string }[];

  @Column('json')
  FAQs: { question: string; answer: string }[];

  @Column()
  ownerId: number;

  @Column('simple-array', { nullable: true })
  images: string[];
}
