import mongoose from "mongoose";
import { IMovie } from "./movie.interfaces";

const movieSchema = new mongoose.Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: false },
  director: { type: String, required: false },
  actors: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);
export default Movie;
