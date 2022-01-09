import * as jobs from "../jobs";
import { JobAlertQueue } from "../jobs/queues";
import { sendJobAlerts } from "./sendJobAlerts";

export const execJobAlerts = async () => {
  try {
    console.log("aha");
    await jobs.add({
      queue: JobAlertQueue,
      options: {
        repeat: {
          every: 1000 * 60, // Every 1 hour
        },
      },
      queueName: "sendJobAlert",
      data: {},
    });

    await jobs.process({
      queueName: "sendJobAlert",
      queue: JobAlertQueue,
      callback: sendJobAlerts,
    });
  } catch (e) {
    console.log(e.message);
  }
};
