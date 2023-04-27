import { Repository } from "typeorm";
import {
  IMovies,
  IMoviesRequest,
  IMoviesUpdate,
} from "../../interfaces/movies.interface";
import Movie from "../../entities/movies.entity";
import { AppDataSource } from "../../data-source";
import { movieSchema } from "../../schemas/movies.schemas";

export const updateMovieService = async (
  id: number,
  userData: IMoviesUpdate
): Promise<IMovies> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const data: Movie | null = await movieRepository.findOneBy({
    id: id,
  });

  const newData: Movie = movieRepository.create({
    ...data,
    ...userData,
  });

  await movieRepository.save(newData);

  const returnMovie: IMovies = movieSchema.parse(newData);

  return returnMovie;
};
