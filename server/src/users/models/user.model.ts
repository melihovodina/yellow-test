import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Image } from "src/images/models/image.model";
import { Run } from "src/run/models/run.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @HasMany(() => Run)
  runs: Run[];

  @HasMany(() => Image)
  images: Image[];
}