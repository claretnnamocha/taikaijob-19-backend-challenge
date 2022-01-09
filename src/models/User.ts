import bcrypt from "bcryptjs";
import { DataTypes } from "sequelize";
import { db } from "../configs/db";

const User = db.define(
  "User",
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        const salt = bcrypt.genSaltSync();
        this.setDataValue("password", bcrypt.hashSync(value, salt));
      },
    },
    planet: { type: DataTypes.STRING },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      values: ["user", "admin"],
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "user" }
);

User.prototype.toJSON = function () {
  let data = this.dataValues;

  delete data.password;
  return data;
};

User.prototype.validatePassword = function (val: string) {
  return bcrypt.compareSync(val, this.getDataValue("password"));
};

export { User };
