import { Router } from "express";
import { movieController } from "./movie.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { movieValidation } from "./movie.validation";

const router = Router();

router.post(
  "/",
  validateRequest(movieValidation.create),
  movieController.create
);
router.get("/", validateRequest(movieValidation.list), movieController.list);
router.get(
  "/:id",
  validateRequest(movieValidation.getDetail),
  movieController.getDetail
);
router.put(
  "/:id",
  validateRequest(movieValidation.update),
  movieController.update
);
router.delete(
  "/:id",
  validateRequest(movieValidation.deleteOne),
  movieController.deleteOne
);

export const movieRouter = router;
