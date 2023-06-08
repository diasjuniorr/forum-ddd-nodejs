import { Entity } from "../core/entities/entity";

interface StudentProps {
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Student extends Entity<StudentProps> {}
