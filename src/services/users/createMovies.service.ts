import { Repository } from "typeorm";
import { IMovies, IMoviesRequest } from "../../interfaces/movies.interface";
import Movie from '../../entities/movies.entity'
import{ AppDataSource} from "../../data-source";
import { movieSchema } from "../../schemas/movies.schemas";


export const createMovieService = async(movieData: IMoviesRequest): Promise<IMovies> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const movie: Movie = movieRepository.create(movieData);
  
    await movieRepository.save(movie);

    const returnMovie: IMovies = movieSchema.parse(movie)
    
    return returnMovie
}