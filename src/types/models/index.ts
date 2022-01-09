import { Model } from "sequelize";
import { Job } from "./Job";
import { User } from "./User";

export interface UserSchema extends Model<User>, User {}
export interface JobSchema extends Model<Job>, Job {}
