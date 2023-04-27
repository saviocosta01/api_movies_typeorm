import { Router } from "express";
import { createMoviesControllers, deleteMovieControllers, listMoviesControllers, updateMoviesControllers } from "../controllers/movies.controllers";
import { validateBodyMiddleware } from "../middlewares/validateBodyMiddleware";
import { movieSchemaRequest, movieSchemaUpdate } from "../schemas/movies.schemas";
import { EnsureNameExistsMiddleware } from "../middlewares/ensureNameExistsMiddleware";
import { EnsureMovieExistsMiddleware } from "../middlewares/ensureMovieExistsMiddleware";


export const moviesRoutes: Router = Router()

moviesRoutes.post("", validateBodyMiddleware(movieSchemaRequest),EnsureNameExistsMiddleware, createMoviesControllers)
moviesRoutes.get("", listMoviesControllers)
moviesRoutes.patch("/:id",validateBodyMiddleware(movieSchemaUpdate),EnsureMovieExistsMiddleware, EnsureNameExistsMiddleware, updateMoviesControllers)
moviesRoutes.delete("/:id", EnsureMovieExistsMiddleware, deleteMovieControllers)