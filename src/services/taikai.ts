import { Op } from "sequelize";
import { v4 as uuid } from "uuid";
import { jwt, mail } from "../helpers";
import {
  activateMail,
  deactivateMail,
  registrationMail
} from "../helpers/mail-messages";
import { Job, User } from "../models";
import { JobSchema, UserSchema } from "../types/models";
import { others, taikai } from "../types/services";

/**
 * Login
 * @param {taikai.SignIn} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const signIn = async (
  params: taikai.SignIn
): Promise<others.Response> => {
  try {
    const { email, password } = params;

    const user: UserSchema = await User.findOne({
      where: { email, role: "admin" },
    });

    if (!user || !user.validatePassword(password))
      return { status: false, message: "Invalid username or password" };

    if (!user.active)
      return { status: false, message: "Account is banned contact admin" };

    const data = jwt.generate(user.id);

    return { status: true, message: "Login successful", data };
  } catch (error) {
    return { status: false, message: "Error trying to login" };
  }
};

/**
 * Signup
 * @param {taikai.SignUp} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const subscribe = async (
  params: taikai.SignUp
): Promise<others.Response> => {
  try {
    const { email } = params;

    const user: UserSchema = await User.findOne({
      where: { email, role: "user" },
    });

    if (user)
      return { status: false, message: "This email is already subscribed" };

    await User.create({ ...params, id: uuid() });

    const html = registrationMail({ email });

    await mail.pepipost.send(email, "Job Alert Registration", html, html);

    return { status: true, message: "Thanks for subscribing to our platform" };
  } catch (error) {
    return { status: false, message: "Error trying to subscribe" };
  }
};

/**
 * Activate job alerts
 * @param {taikai.SignUp} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const activate = async (
  params: taikai.SignUp
): Promise<others.Response> => {
  try {
    const { email } = params;

    const user: UserSchema = await User.findOne({
      where: { email, role: "user" },
    });

    if (!user) return { status: false, message: "User not found" };

    if (user.active)
      return { status: false, message: "Your job alerts are active" };

    await user.update({ active: true });

    const html = activateMail({ email });

    await mail.pepipost.send(email, "Job Alert Activation", html, html);

    return { status: true, message: "Job alerts activated" };
  } catch (error) {
    return { status: false, message: "Error trying to activate alerts" };
  }
};

/**
 * Activate job alerts
 * @param {taikai.SignUp} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const deactivate = async (
  params: taikai.SignUp
): Promise<others.Response> => {
  try {
    const { email } = params;

    const user: UserSchema = await User.findOne({
      where: { email, role: "user" },
    });

    if (!user) return { status: false, message: "User not found" };

    if (!user.active)
      return { status: false, message: "Your job alerts are not active" };

    await user.update({ active: false });

    const html = deactivateMail({ email });

    await mail.pepipost.send(email, "Job Alert Deactivation", html, html);

    return { status: true, message: "Job alerts deactivated" };
  } catch (error) {
    return { status: false, message: "Error trying to deactivate alerts" };
  }
};

/**
 * Create Job
 * @param {taikai.CreateJob} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const createJob = async (
  params: taikai.CreateJob
): Promise<others.Response> => {
  try {
    await Job.create(params);

    return { status: true, message: "Job created successful" };
  } catch (error) {
    return { status: false, message: "Error trying to create job" };
  }
};

/**
 * Get All Jobs
 * @param {taikai.SearchJob} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const getAllJobs = async (
  params: taikai.SearchJob
): Promise<others.Response> => {
  try {
    const { q, skills, market, type, country, planet, page, pageSize } = params;
    let where: any = { isDeleted: false };

    if (q)
      where = {
        ...where,
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
        ],
      };

    if (market) where = { ...where, market };
    if (planet) where = { ...where, planet };
    if (country) where = { ...where, country };
    if (type) where = { ...where, type };
    if (skills) {
      let s: Array<string> = skills.split(",");
      s = s.map((s) => s.trim());
      where = {
        ...where,
        skills: { [Op.overlap]: s },
      };
    }

    const data = await Job.findAll({
      where,
      order: [["updatedAt", "DESC"]],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
    const total = await Job.count({ where });

    return {
      status: true,
      message: "Jobs",
      data,
      metadata: { total, page, pageSize },
    };
  } catch (error) {
    return { status: false, message: "Error trying to get all jobs" + error };
  }
};

/**
 * Get Job Details
 * @param {taikai.JobDetails} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const getJobDetails = async (
  params: taikai.JobDetails
): Promise<others.Response> => {
  try {
    const { jobId } = params;

    const data = await Job.findByPk(jobId);

    if (!data) return { status: false, message: "Job not found" };

    return { status: true, message: "Job details", data };
  } catch (error) {
    return { status: false, message: "Error trying get job details" };
  }
};

/**
 * Update Job Details
 * @param {taikai.UpdateJob} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const updateJobDetails = async (
  params: taikai.UpdateJob
): Promise<others.Response> => {
  try {
    const { jobId } = params;

    const job: JobSchema = await Job.findByPk(jobId);

    delete params.jobId;

    if (!job) return { status: false, message: "Job not found" };

    await job.update(params);

    return { status: true, message: "Job details updated" };
  } catch (error) {
    return { status: false, message: "Error trying update job details" };
  }
};

/**
 * Delete Job
 * @param {taikai.JobDetails} params  Request Body
 * @returns {others.Response} Contains status, message and data if any of the operation
 */
export const deleteJob = async (
  params: taikai.JobDetails
): Promise<others.Response> => {
  try {
    const { jobId } = params;

    const job: JobSchema = await Job.findByPk(jobId);

    if (!job) return { status: false, message: "Job not found" };

    await job.update({ isDeleted: true });

    return { status: true, message: "Job details updated" };
  } catch (error) {
    return { status: false, message: "Error trying delete job" };
  }
};
