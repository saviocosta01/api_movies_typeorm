import {z} from 'zod'
import {  listMovieSchema, movieSchema, movieSchemaRequest, movieSchemaUpdate } from '../schemas/movies.schemas'
import { DeepPartial } from 'typeorm'

export type IMovies = z.infer<typeof movieSchema>

export type IMoviesRequest = z.infer<typeof movieSchemaRequest>

export type IListMoviesResponse = z.infer<typeof listMovieSchema>

export type IMoviesPagination = {
    prevPage: string | null,
    nextPage: string | null,
    count: number,
    data: IListMoviesResponse
}


export type IMoviesUpdate = DeepPartial<IMoviesRequest>
