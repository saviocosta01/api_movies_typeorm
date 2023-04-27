import { Request, Response } from "express";
import { createMovieService } from "../services/users/createMovies.service";
import {
  IListMoviesResponse,
  IMovies,
  IMoviesPagination,
  IMoviesRequest,
  IMoviesUpdate,
} from "../interfaces/movies.interface";
import { listMoviesService } from "../services/users/listMovies.service";
import { movieSchemaRequest, movieSchemaUpdate } from "../schemas/movies.schemas";
import { updateMovieService } from "../services/users/updateMovies.service";
import { deleteMovieService } from "../services/users/deleteMovie.service";
import { DeepPartial } from "typeorm";

export const createMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: IMoviesRequest = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

export const listMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let page: number | undefined = Number(req.query.page)
  let perPage:number | undefined = Number(req.query.perPage)
  let order: any = req.query.order
  let sort : any= req.query.sort

  const movies: IMoviesPagination = await listMoviesService(page, perPage, order, sort);
  
  return res.status(200).json(movies);
};

export const updateMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const userData: IMoviesUpdate = req.body;

  const updateData:IMovies = await updateMovieService(id, userData);

  return res.status(200).json(updateData);
};


export const deleteMovieControllers = async (req: Request,
res: Response
): Promise<Response> => {

    const id: number = Number(req.params.id)

    await deleteMovieService(id)

    return res.status(204).send();
}