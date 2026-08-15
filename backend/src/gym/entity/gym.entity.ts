import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class Gym{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('json',)
    services: {title: string, description: string}[];

    @Column('json')
    pricingPlans: {name: string, price: string, detail: string}[];

    @Column('json')
    FAQs: {question: string, answer: string}[];

    @Column()
    ownerId: number; 

    @Column('simple-array')
    images: string[];

    @AfterInsert()
    logInsert() {
      console.log('Inserted gym with id', this.id);
    }
  
    @AfterUpdate()
    logUpdate() {
      console.log('Updated gym with id', this.id);
    }
  
    @AfterRemove()
    logRemove() {
      console.log('Removed gym with id', this.id);
    }
}


