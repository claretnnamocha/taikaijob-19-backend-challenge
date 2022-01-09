import Bull from "bull";
import { jobs } from "../types";

const { REDIS_URL } = process.env;

export const create = ({ queueName, options = {} }: jobs.create): Bull.Queue =>
  new Bull(queueName, REDIS_URL, options);
