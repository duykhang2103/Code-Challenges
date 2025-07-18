import Movie from "./movie";
import ApiError from "../../../common/error";

const create = async (
  title: string,
  description?: string,
  releaseDate?: string,
  genre?: string,
  director?: string,
  actors?: string[]
) => {
  if (!title) {
    throw new ApiError(400, "Movie title is required");
  }
  const newMovie = new Movie({
    title,
    description,
    releaseDate: new Date(releaseDate || Date.now()),
    genre,
    director,
    actors: actors || [],
    createdAt: new Date(),
  });

  await newMovie.save();

  return {
    _id: newMovie._id,
    title: newMovie.title,
    description: newMovie.description,
    releaseDate: newMovie.releaseDate,
    genre: newMovie.genre,
    director: newMovie.director,
    actors: newMovie.actors,
    createdAt: newMovie.createdAt,
  };
};

const list = async (limit: number = 100, page?: number) => {
  return await Movie.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page || 0) * limit);
};

const getDetail = async (id: string) => {
  return await Movie.find({ _id: id }).select(
    "_id title description releaseDate genre director createdAt"
  );
};

const update = async (
  id: string,
  title?: string,
  description?: string,
  releaseDate?: string,
  genre?: string,
  director?: string,
  actors?: string[]
) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }

  if (title) movie.title = title;
  if (description) movie.description = description;
  if (releaseDate) movie.releaseDate = new Date(releaseDate);
  if (genre) movie.genre = genre;
  if (director) movie.director = director;
  if (actors) movie.actors = actors;
  movie.updatedAt = new Date();

  await movie.save();

  return {
    _id: movie._id,
    title: movie.title,
    description: movie.description,
    releaseDate: movie.releaseDate,
    genre: movie.genre,
    director: movie.director,
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt,
  };
};

const deleteOne = async (id: string) => {
  const movie = await Movie.findOneAndDelete({ _id: id });
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }

  return { message: "Movie deleted successfully" };
};

export const movieService = {
  create,
  list,
  getDetail,
  update,
  deleteOne,
};
