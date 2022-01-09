import * as jobs from "../jobs";
import { JobAlertQueue } from "../jobs/queues";
import { sendJobAlerts } from "./sendJobAlerts";

export const execJobAlerts = async () => {
  await jobs.add({
    queue: JobAlertQueue,
    options: {
      repeat: {
        every: 1000 * 60 * 10, // Every 10mins
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
};
