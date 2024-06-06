const MovieNotesController = require("../controllers/movieNotesController")

const movieNotesController = new MovieNotesController()

const { Router } = require("express")

const movieNotesRoutes = Router()

movieNotesRoutes.post("/:user_id", movieNotesController.create)
movieNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = movieNotesRoutes