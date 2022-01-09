import { Router } from "express";
import { taikai } from "../controllers";
import { authenticate, controller, validate } from "../middlewares";
import { taikai as validator } from "../validators";

const routes = Router();

routes.post("/sign-in", validate(validator.signIn), controller(taikai.signIn));

routes.post(
  "/subscribe",
  validate(validator.signUp),
  controller(taikai.subscribe)
);

routes.get(
  "/job",
  validate(validator.jobDetails),
  controller(taikai.getJobDetails)
);

routes.get(
  "/activate",
  validate(validator.activate),
  controller(taikai.activate)
);

routes.get(
  "/deactivate",
  validate(validator.activate),
  controller(taikai.deactivate)
);

routes.get(
  "/jobs",
  validate(validator.searchJob),
  controller(taikai.getAllJobs)
);

routes.use(authenticate({ isAdmin: true }));

routes.put(
  "/job",
  validate(validator.updateJob),
  controller(taikai.updateJobDetails)
);

routes.delete(
  "/job",
  validate(validator.jobDetails),
  controller(taikai.deleteJob)
);

routes.post(
  "/job",
  validate(validator.createJob),
  controller(taikai.createJob)
);

export default routes;
