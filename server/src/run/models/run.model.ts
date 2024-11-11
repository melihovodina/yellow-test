import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface RunCreationAttr {
  distance: number;
  time: string;
  date: Date;
  userId: number;
}

@Table({tableName: 'run'})
export class Run extends Model<Run, RunCreationAttr> {
  @ApiProperty({example: 1, description: 'run id'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: 10, description: 'run distance in km'})
  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  distance: number;

  @ApiProperty({example: '01:32:58', description: 'run time'})
  @Column({
    type: DataType.TIME,
    allowNull: false
  })
  time: string;

  @ApiProperty({example: '2024-11-11', description: 'run date'})
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: Date;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  runner: User
}