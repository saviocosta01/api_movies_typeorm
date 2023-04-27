import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import Movie from "../entities/movies.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const EnsureNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = req.body;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOne({
    where: {
      name: name,
    },
  });

  if (movie?.name == name) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};
