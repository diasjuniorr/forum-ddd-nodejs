import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

interface InstructorProps {
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Instructor extends Entity<InstructorProps> {
  static create(
    props: Optional<InstructorProps, "createdAt">,
    id?: UniqueEntityId
  ): Instructor {
    return new Instructor(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }
}
