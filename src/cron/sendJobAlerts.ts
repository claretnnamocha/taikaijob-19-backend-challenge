import { mail } from "../helpers";
import { jobAlertMail } from "../helpers/mail-messages";
import { Job, User } from "../models";
import { UserSchema } from "../types/models";

export const sendJobAlerts = async () => {
  try {
    let to: Array<UserSchema> | Array<string> = await User.findAll({
      where: { isDeleted: false, active: true, role: "user" },
      attributes: ["email"],
    });
    to = to.map((t) => t.email);

    const where = { isBroadcasted: false, isDeleted: false };

    let jobs = await Job.findAll({ where });
    console.log(jobs.length && to.length, jobs.length, to.length);

    if (jobs.length && to.length) {
      const html = jobAlertMail(jobs);
      await mail.pepipost.send(to, "Job Alert Recomendations", html, html);
      await Job.update({ isBroadcasted: true }, { where });
    }
  } catch (e) {
    console.log(e.message);
  }
};
