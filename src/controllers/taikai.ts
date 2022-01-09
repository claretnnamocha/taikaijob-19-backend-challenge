import { taikai } from "../services";
import { CustomRequest } from "../types/controllers";

export const signIn = async (req: CustomRequest) =>
  await taikai.signIn(req.form);

export const subscribe = async (req: CustomRequest) =>
  await taikai.subscribe(req.form);

export const createJob = async (req: CustomRequest) =>
  await taikai.createJob(req.form);

export const deleteJob = async (req: CustomRequest) =>
  await taikai.deleteJob(req.form);

export const getAllJobs = async (req: CustomRequest) =>
  await taikai.getAllJobs(req.form);

export const getJobDetails = async (req: CustomRequest) =>
  await taikai.getJobDetails(req.form);

export const updateJobDetails = async (req: CustomRequest) =>
  await taikai.updateJobDetails(req.form);

export const activate = async (req: CustomRequest) =>
  await taikai.activate(req.form);

export const deactivate = async (req: CustomRequest) =>
  await taikai.deactivate(req.form);
