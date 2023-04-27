import { Repository } from "typeorm"
import Movie from '../../entities/movies.entity'
import {AppDataSource} from "../../data-source"


export const deleteMovieService = async(id: number): Promise<Response | void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie: any =  await movieRepository.findOneBy({id : id})

     await movieRepository.remove(movie)

}