import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import Movie from "../entities/movies.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const EnsureMovieExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = Number(req.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOneBy({ id: id });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};
