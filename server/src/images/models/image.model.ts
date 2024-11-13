import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

@Table({tableName: 'images'})
export class Image extends Model<Image> {
  @ApiProperty({example: 1, description: 'run id'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: '42e84e8e-47aa-48b5-b283-79a1b2989398.jpg', description: 'image name'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  filename: string;

  @ApiProperty({example: '/uploads/42e84e8e-47aa-48b5-b283-79a1b2989398.jpg', description: 'image url'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  url: string;

  @ApiProperty({example: 1, description: 'runner id'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  author: User
}