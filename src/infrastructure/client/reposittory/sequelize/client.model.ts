import {
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProjectModel from "../../../planning/repository/sequelize/project.model";

@Table({
  tableName: "client",
  timestamps: false,
})
export default class ClientModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare zip_code: string;

  @HasMany(() => ProjectModel)
  declare project: ProjectModel[];
}
