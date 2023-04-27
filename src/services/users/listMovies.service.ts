import { Repository } from "typeorm";
import {
  IListMoviesResponse,
  IMoviesPagination,
} from "../../interfaces/movies.interface";
import { AppDataSource } from "../../data-source";
import Movie from "../../entities/movies.entity";
import { listMovieSchema } from "../../schemas/movies.schemas";

export const listMoviesService = async (
  page: number,
  perPage: number,
  order: string,
  sort: string
): Promise<IMoviesPagination> => {
  // page, perPage, order e sort

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let movies: Movie[] | undefined = await movieRepository.find();
  const MoviesLength = movies.length;

  let queryOrder: string =  !order ? "asc" : order;
  let querySort: string = !sort ? "id" : sort;
  let orderValue: any = ''

  if (perPage < 0 || perPage > 5 || !perPage) {
    perPage = 5;
  }
  if (!page || page <= 0) {
    page = 1;
  }
  let pageValue = Number(page) || 1;
  let perPageValue = Number(perPage) || 5;


  if(sort){
    orderValue = {
      [querySort]: queryOrder,
    }
  }

  movies = await movieRepository.find({
    skip: (pageValue - 1) * perPageValue,
    take: perPageValue,
    order: orderValue
  });

  let prevPage: string | null = `http://localhost:3000/movies?page=${
    Number(pageValue) - 1
  }&perPage=${perPageValue}`;
  let nextPage: string | null = `http://localhost:3000/movies?page=${
    Number(pageValue) + 1
  }&perPage=${perPageValue}`;

  if (pageValue - 1 <= 0) {
    prevPage = null;
  }
  if (movies.length < perPageValue) {
    nextPage = null;
  }

  const returnMovies: IListMoviesResponse = listMovieSchema.parse(movies);

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: MoviesLength,
    data: returnMovies,
  };
};
