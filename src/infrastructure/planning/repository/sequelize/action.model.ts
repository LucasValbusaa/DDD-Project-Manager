import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProjectModel from "./project.model";

@Table({
  tableName: "action",
  timestamps: false,
})
export default class ActionModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare worked_hours: number;

  @Column({ allowNull: false })
  declare value_per_hours: number;

  @ForeignKey(() => ProjectModel)
  @Column
  declare project_id: string;

  @BelongsTo(() => ProjectModel)
  declare project: ProjectModel[];
}
