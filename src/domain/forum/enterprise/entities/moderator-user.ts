import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { User, UserProps } from "../../../core/entities/user";
import { Optional } from "../../../core/types/optional";

export interface ModeratorUserProps extends UserProps {
  level: number;
}

export class ModeratorUser extends User<ModeratorUserProps> {
  get level(): number {
    return this.props.level;
  }

  static create(
    props: Optional<ModeratorUserProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    return new ModeratorUser(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
