import { Request, Response, NextFunction } from "express";
import { movieService } from "./movie.service";
import {
  sendRedirectResponse,
  sendSuccessResponse,
} from "../../../common/successResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, releaseDate, genre, director } = req.body;
    const movie = await movieService.create(
      title,
      description,
      releaseDate,
      genre,
      director
    );
    sendSuccessResponse(res, movie, 201, "Movie created successfully");
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, page } = req.query as { limit?: number; page?: number };
    const movies = await movieService.list(limit, page);
    sendSuccessResponse(res, movies, 200, "Movies fetched successfully");
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getDetail(id);
    sendSuccessResponse(res, movie, 200, "Movie details fetched successfully");
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, releaseDate, genre, director } = req.body;
    const updatedMovie = await movieService.update(
      id,
      title,
      description,
      releaseDate,
      genre,
      director
    );
    sendSuccessResponse(res, updatedMovie, 200, "Movie updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await movieService.deleteOne(id);
    sendSuccessResponse(res, null, 204, "Movie deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const movieController = {
  create,
  list,
  getDetail,
  update,
  deleteOne,
};
