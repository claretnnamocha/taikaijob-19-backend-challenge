import { Response } from "express";
import { response } from "../helpers";
import { CustomRequest } from "../types/controllers";

export const controller =
  (controller: Function) => async (req: CustomRequest, res: Response) => {
    try {
      const data = await controller(req);

      return response(res, data, data.status ? 200 : 400);
    } catch (error) {
      return response(
        res,
        { status: false, message: "Internal server error" },
        500
      );
    }
  };
