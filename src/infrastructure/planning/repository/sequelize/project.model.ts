import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ActionModel from "./action.model";
import ClientModel from "../../../client/reposittory/sequelize/client.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

@Table({
  tableName: "project",
  timestamps: false,
})
export default class ProjectModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  declare client_id: string;

  @BelongsTo(() => ClientModel)
  declare client: ClientModel;

  @HasMany(() => ActionModel)
  declare actions: ActionModel[];

  @HasOne(() => ProductModel)
  declare product: ProductModel;
}
