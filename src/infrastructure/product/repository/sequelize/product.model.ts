import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProjectModel from "../../../planning/repository/sequelize/project.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare price: number;

  @ForeignKey(() => ProjectModel)
  @Column({ allowNull: false })
  declare project_id: string;

  @BelongsTo(() => ProjectModel)
  declare project: ProjectModel;
}
