import { DataTypes } from "sequelize";
import { db } from "../configs/db";

const Job = db.define(
  "Job",
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    skills: { type: DataTypes.ARRAY(DataTypes.STRING) },
    market: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    planet: { type: DataTypes.STRING },
    isBroadcasted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "job" }
);

Job.prototype.toJSON = function () {
  return this.dataValues;
};

export { Job };
